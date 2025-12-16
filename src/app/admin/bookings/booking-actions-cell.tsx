"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cancelBookingAction } from "@/app/actions/booking-actions";
import { useRouter } from "next/navigation";
import { Loader2, XCircle } from "lucide-react";

export function BookingActions({ bookingId, status }: { bookingId: string, status: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    if (status === "cancelled") return null;

    const handleCancel = async () => {
        if (!confirm("Soll diese Buchung wirklich storniert werden?")) return;

        setLoading(true);
        try {
            await cancelBookingAction(bookingId);
            router.refresh(); // Refresh server component
        } catch (e) {
            alert("Fehler beim Stornieren");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            disabled={loading}
            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
        >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-1" />}
            Stornieren
        </Button>
    );
}
