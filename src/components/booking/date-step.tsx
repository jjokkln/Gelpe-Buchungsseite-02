
"use client";

import { useState, useEffect } from "react";
import { differenceInMinutes, addHours, format, setHours, setMinutes } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TARIFFS, type TariffType } from "@/config/tariffs";
import { JollyRangeCalendar } from "@/components/ui/aria-calendar";
import { getLocalTimeZone, now, type DateValue, ZonedDateTime } from "@internationalized/date";

export function DateStep({
    onNext,
    setBookingData,
}: {
    onNext: () => void;
    setBookingData: (data: any) => void;
}) {
    // Dates (DateValue from Aria)
    const [range, setRange] = useState<{ start: DateValue, end: DateValue } | null>(null);

    // Times (Separate state for Manual Input)
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");

    const [extraKm, setExtraKm] = useState<number>(0);
    const [calculatedTariff, setCalculatedTariff] = useState<TariffType>("fullDay");
    const [price, setPrice] = useState<number>(0);
    const [blockedDates, setBlockedDates] = useState<string[]>([]);

    useEffect(() => {
        const fetchBlocked = async () => {
            const { getBlockedDatesAction } = await import("@/app/actions/booking-actions");
            const today = new Date();
            const future = addHours(today, 24 * 180);
            const dates = await getBlockedDatesAction(today.toISOString(), future.toISOString());
            setBlockedDates(dates.map(d => d.toISOString().split('T')[0]));
        };
        fetchBlocked();
    }, []);

    const isDateUnavailable = (date: DateValue) => {
        const dateStr = date.toString(); // YYYY-MM-DD
        return blockedDates.includes(dateStr);
    };

    useEffect(() => {
        if (!range?.start || !range?.end || !startTime || !endTime) {
            setPrice(0); // Reset price if info missing
            return;
        }

        // COMBINE Date + Time
        const startDateTime = new Date(range.start.toString());
        const [startH, startM] = startTime.split(':').map(Number);

        // Validation for partial input
        if (isNaN(startH) || isNaN(startM)) return;

        startDateTime.setHours(startH, startM);

        const endDateTime = new Date(range.end.toString());
        const [endH, endM] = endTime.split(':').map(Number);

        if (isNaN(endH) || isNaN(endM)) return;

        endDateTime.setHours(endH, endM);

        // Logic check: If end is before start on same day? 
        // Actually Calendar ensures start <= end date. 
        // If same day, endTime must be > startTime?
        // Let's assume user is smart, or we enforce min duration.

        const minutes = differenceInMinutes(endDateTime, startDateTime);
        const hours = minutes / 60;

        // Determine Tariff
        let tariff: TariffType = "weekly";
        if (hours <= 0) {
            // Invalid choice, maybe reset price
            setPrice(0);
            return;
        }

        if (hours <= 12.5) tariff = "halfDay";
        else if (hours <= 25) tariff = "fullDay";
        else if (hours <= 49) tariff = "weekend";
        else tariff = "weekly";

        setCalculatedTariff(tariff);

        // Price
        const tariffPrice = TARIFFS[tariff].price;
        const extraKmPrice = Math.max(0, extraKm) * 0.45;
        const totalPrice = tariffPrice + extraKmPrice;

        setPrice(Number(totalPrice.toFixed(2)));

        setBookingData((prev: any) => ({
            ...prev,
            startDate: startDateTime,
            endDate: endDateTime,
            price: Number(totalPrice.toFixed(2)),
            tariff: tariff,
            startTime: startTime,
            extraKm: extraKm,
        }));

    }, [range, startTime, endTime, extraKm, setBookingData]);

    const handleNext = () => {
        if (range?.start && range?.end && price > 0 && startTime && endTime) {
            onNext();
        }
    };

    return (
        <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto text-white">
            <div className="text-center space-y-2 mb-2">
                <h2 className="text-3xl font-display font-bold">Wähle deinen Zeitraum</h2>
                <p className="text-white/60">Datum wählen und Uhrzeiten eintragen.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">

                {/* 1. CALENDAR (Inline) */}
                <div className="bg-primary-950/40 p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden flex flex-col items-center">
                    {/* Glow */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

                    <Label className="text-white text-lg font-bold mb-4 w-full text-left">Reisezeitraum</Label>
                    <JollyRangeCalendar
                        aria-label="Reisezeitraum wählen"
                        className="bg-transparent border-none shadow-none"
                        value={range}
                        onChange={setRange}
                        isDateUnavailable={isDateUnavailable}
                    />
                </div>

                {/* 2. TIME SELECTION & EXTRAS */}
                <div className="space-y-6">

                    {/* Time Input Container */}
                    <div className="bg-primary-950/40 p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md space-y-6 relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div>
                            <Label className="text-white text-lg font-bold mb-4 block">Uhrzeiten</Label>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-white/70 text-sm">Abholung</Label>
                                    <Input
                                        type="time"
                                        className="bg-black/20 border-white/10 text-white h-12 [color-scheme:dark]"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white/70 text-sm">Rückgabe</Label>
                                    <Input
                                        type="time"
                                        className="bg-black/20 border-white/10 text-white h-12 [color-scheme:dark]"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Dynamic Info */}
                        <div className="flex justify-between items-center text-xs px-1 pt-4 border-t border-white/10">
                            <span className="text-white/50">
                                Dein Tarif: <span className="text-accent font-medium">{TARIFFS[calculatedTariff].label}</span>
                            </span>
                            <span className="text-white/50">
                                Dauer: {range && startTime && endTime && (
                                    (differenceInMinutes(
                                        new Date(range.end.toString() + 'T' + endTime),
                                        new Date(range.start.toString() + 'T' + startTime)
                                    ) / 60).toFixed(1)
                                )} Std.
                            </span>
                        </div>
                    </div>

                    {/* Extra KM */}
                    <div className="bg-primary-950/40 p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md space-y-4">
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

                    <Button
                        onClick={handleNext}
                        disabled={!range?.start || !range?.end || !startTime || !endTime || price <= 0}
                        className="w-full h-14 text-lg font-bold shadow-xl shadow-accent/20 rounded-xl"
                        size="lg"
                    >
                        Weiter zur Zahlung
                    </Button>

                </div>
            </div>
        </div>
    );
}

