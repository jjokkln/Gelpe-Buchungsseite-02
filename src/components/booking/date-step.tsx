
"use client";

import { useState, useEffect } from "react";
import { differenceInMinutes, addHours, format } from "date-fns";
import { Button } from "@/components/ui/button"; // Use standard button for the main action
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TARIFFS, type TariffType } from "@/config/tariffs";
import { JollyDateRangePicker } from "@/components/ui/date-range-picker";
import { getLocalTimeZone, now, ZonedDateTime } from "@internationalized/date";

export function DateStep({
    onNext,
    setBookingData,
}: {
    onNext: () => void;
    setBookingData: (data: any) => void;
}) {
    // Default to today 08:00 to tomorrow 08:00 (24h)
    const [range, setRange] = useState<{ start: ZonedDateTime, end: ZonedDateTime } | null>(() => {
        const _now = now(getLocalTimeZone());
        // Default start: Next full hour or standard 08:00?
        // Let's settle on current time for start, +24h for end
        return {
            start: _now,
            end: _now.add({ hours: 24 })
        };
    });

    const [extraKm, setExtraKm] = useState<number>(0);
    const [calculatedTariff, setCalculatedTariff] = useState<TariffType>("fullDay");
    const [price, setPrice] = useState<number>(0);
    const [blockedDates, setBlockedDates] = useState<string[]>([]); // Strings for easier comparison

    useEffect(() => {
        // Fetch blocked dates
        const fetchBlocked = async () => {
            const { getBlockedDatesAction } = await import("@/app/actions/booking-actions");
            const today = new Date();
            const future = addHours(today, 24 * 180);
            const dates = await getBlockedDatesAction(today.toISOString(), future.toISOString());
            setBlockedDates(dates.map(d => d.toISOString().split('T')[0]));
        };
        fetchBlocked();
    }, []);

    const isDateUnavailable = (date: ZonedDateTime) => {
        const dateStr = date.toDate().toISOString().split('T')[0];
        return blockedDates.includes(dateStr);
    };

    useEffect(() => {
        if (!range?.start || !range?.end) return;

        // Convert to JS Dates for calculation
        const startDate = range.start.toDate();
        const endDate = range.end.toDate();

        const minutes = differenceInMinutes(endDate, startDate);
        const hours = minutes / 60;

        // Determine Tariff
        let tariff: TariffType = "weekly";
        if (hours <= 12.5) tariff = "halfDay"; // Tolerance for 12h
        else if (hours <= 25) tariff = "fullDay"; // Tolerance for 24h
        else if (hours <= 49) tariff = "weekend"; // Tolerance for 48h
        else tariff = "weekly";

        // Check if > 7 days (Logic per requirements: max 7 days)
        if (hours > 7 * 24 + 4) { // 4h tolerance
            // ...
        }

        setCalculatedTariff(tariff);

        // Calculate Price
        const tariffPrice = TARIFFS[tariff].price;
        const extraKmPrice = Math.max(0, extraKm) * 0.45;
        const totalPrice = tariffPrice + extraKmPrice;

        setPrice(Number(totalPrice.toFixed(2)));

        // Update Parent
        setBookingData((prev: any) => ({
            ...prev,
            startDate: startDate,
            endDate: endDate,
            price: Number(totalPrice.toFixed(2)),
            tariff: tariff,
            startTime: format(startDate, "HH:mm"), // Helper for existing logic if needed
            extraKm: extraKm,
        }));

    }, [range, extraKm, setBookingData, blockedDates]);

    const handleNext = () => {
        if (range?.start && range?.end) {
            onNext();
        }
    };

    return (
        <div className="flex flex-col gap-8 w-full max-w-xl mx-auto text-white">
            <div className="text-center space-y-2 mb-2">
                <h2 className="text-3xl font-display font-bold">Wähle deinen Zeitraum</h2>
                <p className="text-white/60">Start- und Endzeit einfach im Kalender verbinden.</p>
            </div>

            {/* Glass Container */}
            <div className="bg-primary-950/40 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md space-y-8 relative overflow-hidden">

                {/* Glow Effect */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                    {/* Date Range Picker */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-white text-base">Mietzeitraum</Label>
                        <JollyDateRangePicker
                            className="w-full"
                            value={range}
                            onChange={(r) => r && setRange({ start: r.start as ZonedDateTime, end: r.end as ZonedDateTime })}
                            granularity="minute"
                            hourCycle={24}
                            hideTimeZone
                            label=""
                            isDateUnavailable={isDateUnavailable as any}
                        />
                        {/* Dynamic Info */}
                        <div className="flex justify-between items-center text-xs px-1">
                            <span className="text-white/50">
                                Dein Tarif: <span className="text-accent font-medium">{TARIFFS[calculatedTariff].label}</span>
                            </span>
                            <span className="text-white/50">
                                Dauer: {range && (differenceInMinutes(range.end.toDate(), range.start.toDate()) / 60).toFixed(1)} Std.
                            </span>
                        </div>
                    </div>

                    {/* Extra KM */}
                    <div className="space-y-2 pt-4 border-t border-white/10">
                        <div className="flex justify-between items-center">
                            <Label className="text-white">Zusätzliche Kilometer</Label>
                            <span className="text-xs text-white/50">Inklusive: {TARIFFS[calculatedTariff].includedKm} km</span>
                        </div>
                        <div className="relative">
                            <Input
                                type="number"
                                min="0"
                                step="10"
                                value={extraKm === 0 ? "" : extraKm}
                                onChange={(e) => setExtraKm(Number(e.target.value))}
                                placeholder="0"
                                className="bg-black/20 border-white/10 text-white h-12 pr-20"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/50 pointer-events-none">
                                + {(extraKm * 0.45).toFixed(2)} €
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Button
                onClick={handleNext}
                disabled={!range?.start || !range?.end}
                className="w-full h-14 text-lg font-bold shadow-xl shadow-accent/20 rounded-xl"
                size="lg"
            >
                Weiter zur Zahlung
            </Button>
        </div>
    );
}

