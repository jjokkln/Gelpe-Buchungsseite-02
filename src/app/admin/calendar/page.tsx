import { createClient } from "@/lib/supabase/server";
import { CalendarManager } from "./calendar-manager";

export default async function AdminCalendarPage() {
    const supabase = await createClient();

    // Fetch manual blocks
    const { data: blocks } = await supabase
        .from("blocked_dates")
        .select("*")
        .order("start_date", { ascending: true });

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-display font-bold text-white">Kalender Verwaltung</h1>
            </header>

            <CalendarManager initialBlocks={blocks || []} />
        </div>
    );
}
