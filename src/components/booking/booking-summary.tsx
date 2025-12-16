
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface BookingSummaryProps {
    bookingData: {
        startDate?: Date;
        endDate?: Date;
        price?: number;
        tariff?: "halfDay" | "fullDay" | "weekend" | "weekly";
        extraKm?: number;
    };
    step: number;
}

export function BookingSummary({ bookingData, step }: BookingSummaryProps) {
    const { startDate, endDate, price } = bookingData;

    return (
        <div className="bg-white/5 rounded-2xl ring-1 ring-white/10 p-6 space-y-6 sticky top-24">
            <h3 className="font-display text-xl text-white">Deine Buchung</h3>

            {/* Date Range */}
            <div className="space-y-2">
                <p className="text-sm text-white/50 uppercase tracking-wide">Zeitraum</p>
                {startDate && endDate ? (
                    <div className="text-white">
                        <p>{format(startDate, "dd.MM.yyyy", { locale: de })}</p>
                        <p className="text-white/50 text-xs">bis</p>
                        <p>{format(endDate, "dd.MM.yyyy", { locale: de })}</p>
                    </div>
                ) : (
                    <p className="text-white/30 italic">Bitte wählen...</p>
                )}
            </div>

            {/* Price Check */}
            <div className="space-y-2 pt-4 border-t border-white/10">
                <div className="flex justify-between text-sm text-white/70">
                    <span>Mietpreis ({bookingData.tariff ? {
                        halfDay: "Halbtags",
                        fullDay: "Ganztags",
                        weekend: "Wochenend",
                        weekly: "Wochen"
                    }[bookingData.tariff] + "-Tarif" : "-"})</span>
                    <span>{bookingData.price && bookingData.extraKm ? (bookingData.price - (bookingData.extraKm * 0.45)).toFixed(2) : bookingData.price || "0"} €</span>
                </div>

                {bookingData.tariff && (
                    <div className="flex justify-between text-xs text-white/50 pl-2">
                        <span>Inklusive Kilometer</span>
                        <span>{
                            {
                                halfDay: 100,
                                fullDay: 200,
                                weekend: 400,
                                weekly: 400
                            }[bookingData.tariff]
                        } km</span>
                    </div>
                )}

                {bookingData.extraKm ? (
                    <div className="flex justify-between text-sm text-white/70">
                        <span>Extra Kilometer ({bookingData.extraKm} km)</span>
                        <span>+ {(bookingData.extraKm * 0.45).toFixed(2)} €</span>
                    </div>
                ) : null}

                <div className="flex justify-between text-sm text-white/70">
                    <span>Kaution</span>
                    <span>500 €</span>
                </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="font-semibold text-white">Gesamt</span>
                <span className="text-2xl font-display font-bold text-accent">
                    {price ? `${price.toFixed(2)} €` : "0 €"}
                </span>
            </div>
            <p className="text-xs text-white/30 text-right">+ 500 € Kaution (vor Ort)</p>

            {/* Info Badges */}
            <div className="pt-4 space-y-2">
                <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-xs text-white/60">
                    <span className="block font-medium text-white mb-0.5">Stornierung</span>
                    Bis 14 Tage vorher kostenlos. Danach 25 € Pauschale.
                </div>
                <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-xs text-white/60">
                    <span className="block font-medium text-white mb-0.5">Reinigung</span>
                    Besenrein übergeben. Sonst 45 € Pauschale.
                </div>
            </div>
        </div>
    );
}
