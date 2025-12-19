import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarDays, ReceiptText } from "lucide-react";
import { Button } from "../ui/button";
import { generateInvoice } from "@/lib/invoice-generator";

export function BookingCard({ booking }: { booking: any }) {
    const isPaid = booking.status === 'paid' || booking.booking_status === 'paid';

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row justify-between gap-6 hover:bg-white/10 transition-colors">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Badge variant={isPaid ? "default" : "secondary"} className={isPaid ? "bg-accent text-black" : "bg-white/20"}>
                        {isPaid ? "Bezahlt" : "Reserviert"}
                    </Badge>
                    <span className="text-white/40 text-sm">#{booking.id.slice(0, 8)}</span>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center text-white/80">
                        <CalendarDays className="w-4 h-4 mr-2 text-accent" />
                        <span>{format(new Date(booking.start_date), "dd. MMM yyyy", { locale: de })} - {format(new Date(booking.end_date), "dd. MMM yyyy", { locale: de })}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-end justify-between gap-4">
                <div className="text-right">
                    <p className="text-white/40 text-sm">Gesamtpreis</p>
                    <p className="text-2xl font-bold text-white">{Number(booking.total_price || booking.total_price_eur).toFixed(2)} €</p>
                </div>

                {isPaid && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-white border-white/20 hover:bg-white/20 gap-2"
                        onClick={() => generateInvoice(booking)}
                    >
                        <ReceiptText className="w-4 h-4" />
                        Rechnung
                    </Button>
                )}
            </div>
        </div>
    );
}
