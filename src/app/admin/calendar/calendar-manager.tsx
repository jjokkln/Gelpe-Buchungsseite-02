"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { blockDateAction, unblockDateAction } from "@/app/actions/booking-actions";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { addDays, format, isBefore, startOfToday } from "date-fns";
import { de } from "date-fns/locale";
import { DateRange } from "react-day-picker";

type BlockedDateEntry = {
    id: number;
    start_date: string;
    end_date: string;
    reason: string | null;
};

export function CalendarManager({ initialBlocks }: { initialBlocks: BlockedDateEntry[] }) {
    const [date, setDate] = useState<DateRange | undefined>();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Convert blocks to Dates for Calendar disabling
    const disabledDates = initialBlocks.flatMap(b => {
        const start = new Date(b.start_date);
        const end = new Date(b.end_date);
        const dates = [];
        let current = start;
        while (current <= end) {
            dates.push(new Date(current));
            current = addDays(current, 1);
        }
        return dates;
    });

    const handleBlock = async () => {
        if (!date?.from || !date?.to) return;
        setLoading(true);
        try {
            await blockDateAction(date.from, date.to, "Manuelle Blockierung");
            setDate(undefined);
            router.refresh();
        } catch (e) {
            alert("Fehler beim Blockieren");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (entry: BlockedDateEntry) => {
        if (!confirm(`Blockierung vom ${format(new Date(entry.start_date), "dd.MM.yyyy")} wirklich löschen?`)) return;
        setLoading(true);
        try {
            await unblockDateAction(new Date(entry.start_date));
            router.refresh();
        } catch (e) {
            alert("Fehler beim Löschen");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="bg-neutral-900 border border-white/10 p-6 rounded-xl">
                    <h2 className="text-xl font-display font-bold text-white mb-4">Zeitraum blockieren</h2>
                    <div className="flex flex-col items-center space-y-4">
                        <Calendar
                            locale={de}
                            mode="range"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => isBefore(date, startOfToday())} // Disable past dates properly
                            modifiers={{ blocked: disabledDates }}
                            className="rounded-md border border-white/10 bg-black/20"
                        />
                        <Button
                            onClick={handleBlock}
                            disabled={!date?.from || !date?.to || loading}
                            className="w-full"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Blockieren
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-neutral-900 border border-white/10 p-6 rounded-xl">
                    <h2 className="text-xl font-display font-bold text-white mb-4">Aktive Blockierungen</h2>
                    <div className="space-y-3">
                        {initialBlocks.length === 0 && <p className="text-white/50 text-sm">Keine manuellen Blockierungen.</p>}
                        {initialBlocks.map(block => (
                            <div key={block.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                <div>
                                    <div className="text-white font-medium">
                                        {format(new Date(block.start_date), "dd.MM.yyyy")} - {format(new Date(block.end_date), "dd.MM.yyyy")}
                                    </div>
                                    <div className="text-xs text-white/50">{block.reason || "Kein Grund"}</div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(block)}
                                    className="text-white/40 hover:text-red-400 hover:bg-red-900/20"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
