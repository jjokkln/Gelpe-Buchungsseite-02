import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface Booking {
    id: string;
    start_date: string;
    end_date: string;
    status: "reserved" | "paid" | "cancelled";
    total_price: number;
}

export function BookingCard({ booking }: { booking: Booking }) {
    const statusColors = {
        reserved: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        paid: "bg-green-500/10 text-green-500 border-green-500/20",
        cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    const statusLabels = {
        reserved: "Reserviert (Ausstehend)",
        paid: "Bezahlt",
        cancelled: "Storniert",
    };

    return (
        <div className="bg-white/5 rounded-xl border border-white/10 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
                <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[booking.status]}`}>
                        {statusLabels[booking.status]}
                    </span>
                    <span className="text-white/50 text-sm">#{booking.id.slice(0, 8)}</span>
                </div>
                <p className="text-lg text-white font-medium">
                    {format(new Date(booking.start_date), "d. MMMM yyyy", { locale: de })} -{" "}
                    {format(new Date(booking.end_date), "d. MMMM yyyy", { locale: de })}
                </p>
                <p className="text-white/70">
                    Gesamtpreis: <span className="text-white font-medium">{booking.total_price} €</span>
                </p>
            </div>

            {booking.status !== "cancelled" && (
                <div className="flex gap-2 w-full sm:w-auto">
                    {/* Future: Add Stripe Payment Link if status is reserved */}
                    {booking.status === 'reserved' && (
                        <Button variant="default" size="sm" className="flex-1 sm:flex-none">Bezahlen</Button>
                    )}
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-red-400 hover:text-red-300 border-white/10 hover:bg-white/5">
                        Stornieren
                    </Button>
                </div>
            )}
        </div>
    );
}
