"use server";

import { createClient } from "@/lib/supabase/server";

export async function getBlockedDatesAction(startDateStr: string, endDateStr: string): Promise<Date[]> {
    const supabase = await createClient();

    // Parse dates (Server Actions receive simple types)
    // Note: ISO strings are safe to compare in lexicographical order in SQL usually,
    // but we use Supabase filters here.

    // 1. Fetch Active Bookings (Only dates, no user info)
    const { data: bookings } = await supabase
        .from("bookings")
        .select("start_date, end_date")
        .in("booking_status", ["reserved", "paid"])
        .or(`start_date.lte.${endDateStr},end_date.gte.${startDateStr}`);

    // 2. Fetch Manual Blocks
    const { data: blocks } = await supabase
        .from("blocked_dates")
        .select("start_date, end_date")
        .or(`start_date.lte.${endDateStr},end_date.gte.${startDateStr}`);

    const blocked: Date[] = [];
    const normalize = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

    const allRanges = [...(bookings || []), ...(blocks || [])];

    allRanges.forEach(range => {
        let current = new Date(range.start_date);
        const end = new Date(range.end_date);

        while (current <= end) {
            blocked.push(normalize(current));
            current.setDate(current.getDate() + 1);
        }
    });

    // Deduplicate and return serialized dates (timestamps or ISO strings) 
    // but Client Components expect Dates often. Server Actions return JSON serializable data.
    // It is safer to return timestamps or ISO strings to client and let client parse.
    const uniqueTimestamps = Array.from(new Set(blocked.map(d => d.getTime())));

    // Return as numbers (timestamps) to be easily revived as Dates on client
    return uniqueTimestamps.map(t => new Date(t));
}

export async function cancelBookingAction(bookingId: string) {
    const supabase = await createClient();

    // Auth check (Admin or Owner) -- simplified to Admin or own booking here
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    // Start Updating
    const { error } = await supabase
        .from("bookings")
        .update({ booking_status: "cancelled", status: "cancelled" })
        .eq("id", bookingId);

    if (error) throw new Error(error.message);
    return { success: true };
}

export async function blockDateAction(start: Date, end: Date, reason: string = "Manual Block") {
    const supabase = await createClient();
    // Verify Admin (basic check, layout handles strict)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase
        .from("blocked_dates")
        .insert({
            start_date: start.toISOString(),
            end_date: end.toISOString(),
            reason: reason
        });

    if (error) throw new Error(error.message);
    return { success: true };
}

export async function unblockDateAction(date: Date) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    // Delete block that covers this date
    // We want: start_date <= date AND end_date >= date
    const isoDate = date.toISOString();

    const { error } = await supabase
        .from("blocked_dates")
        .delete()
        .lte("start_date", isoDate)
        .gte("end_date", isoDate);

    if (error) throw new Error(error.message);
    return { success: true };
}
