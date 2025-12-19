import { createClient } from "@/lib/supabase/server";
import { BookingCard } from "@/components/dashboard/booking-card";

export const dynamic = 'force-dynamic'

export default async function DashboardPage(props: { searchParams: Promise<{ success?: string }> }) {
    const searchParams = await props.searchParams;
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null; // Handled by layout

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const { data: bookings } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .gte("end_date", yesterday.toISOString()) // Hide old bookings
        .order("created_at", { ascending: false });

    return (
        <div className="space-y-6">
            {searchParams.success && (
                <div className="p-4 mb-6 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
                    <p className="font-bold">Zahlung erfolgreich!</p>
                    <p className="text-sm opacity-90">Deine Buchung wurde bestätigt.</p>
                </div>
            )}
            <div className="bg-white/5 rounded-2xl ring-1 ring-white/10 p-6 md:p-8">
                <h2 className="text-xl font-display text-white mb-6">Meine Buchungen</h2>

                {!bookings || bookings.length === 0 ? (
                    <div className="text-center py-12 text-white/50">
                        <p>Keine Buchungen gefunden.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <BookingCard key={booking.id} booking={booking as any} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
