"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface AdminExportButtonProps {
    bookings: any[];
}

export function AdminExportButton({ bookings }: AdminExportButtonProps) {
    const handleExport = () => {
        if (!bookings || bookings.length === 0) {
            alert("Keine Buchungen zum Exportieren vorhanden.");
            return;
        }

        // Define CSV Headers
        const headers = [
            "ID",
            "Kunde Vorname",
            "Kunde Nachname",
            "Email",
            "Telefon",
            "Start Datum",
            "End Datum",
            "Typ",
            "Preis (EUR)",
            "Status",
            "Zahlungsmethode",
            "Erstellt am"
        ];

        // Map Data to Rows
        const rows = bookings.map(b => {
            // Handle profiles relation which might be an array or object depending on query
            const profile = Array.isArray(b.profiles) ? b.profiles[0] : b.profiles;

            return [
                b.id,
                b.customer_first_name || profile?.first_name || "",
                b.customer_last_name || profile?.last_name || "",
                b.customer_email || profile?.email || "",
                profile?.phone || "",
                new Date(b.start_date).toLocaleString("de-DE"),
                new Date(b.end_date).toLocaleString("de-DE"),
                b.rental_type,
                b.total_price_eur,
                b.booking_status,
                b.payment_method,
                new Date(b.created_at).toLocaleString("de-DE")
            ].map(field => `"${String(field || "").replace(/"/g, '""')}"`); // Escape quotes
        });

        // Combine Headers and Rows
        const csvContent = [
            headers.join(","),
            ...rows.map((r: any[]) => r.join(","))
        ].join("\n");

        // Create Blob and Download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `buchungen_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Button onClick={handleExport} variant="outline" size="sm" className="gap-2 border-white/10 hover:bg-white/5 text-white">
            <Download className="w-4 h-4" />
            CSV Export
        </Button>
    );
}
