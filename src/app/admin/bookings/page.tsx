import { createClient } from "@/lib/supabase/server";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// This needs to be a Client Component for interactivity, or we use a Client Component for the Table Row.
// Let's make the Page Client Component? No, let's make the Table Row a Client Component.
// Actually, for simplicity, let's keep Page Server but use a Client Component for the Actions Cell.

import { BookingActions } from "./booking-actions-cell"; // We will create this

export default async function AdminBookingsPage() {
    const supabase = await createClient();

    const { data: bookings, error } = await supabase
        .from("bookings")
        .select(`
            *,
            profiles:user_id (email, first_name, last_name, phone)
        `)
        .order("created_at", { ascending: false });

    if (error) {
        return <div className="text-red-500">Fehler beim Laden der Buchungen: {error.message}</div>
    }

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-display font-bold text-white">Buchungen</h1>
                <div className="bg-white/10 px-4 py-2 rounded-full text-sm text-white/70">
                    {bookings?.length || 0} Buchungen
                </div>
            </header>

            <div className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/10 hover:bg-transparent">
                            <TableHead className="text-white/60">Kunde</TableHead>
                            <TableHead className="text-white/60">Zeitraum</TableHead>
                            <TableHead className="text-white/60">Tarif</TableHead>
                            <TableHead className="text-white/60">Preis</TableHead>
                            <TableHead className="text-white/60">Status</TableHead>
                            <TableHead className="text-white/60">Zahlung</TableHead>
                            <TableHead className="text-white/60 text-right">Erstellt am</TableHead>
                            <TableHead className="text-white/60">Aktionen</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings?.map((booking) => {
                            // Type assertion or check for profiles array/object
                            const profile = Array.isArray(booking.profiles) ? booking.profiles[0] : booking.profiles;

                            return (
                                <TableRow key={booking.id} className="border-white/10 hover:bg-white/5">
                                    <TableCell className="font-medium text-white">
                                        <div>{booking.customer_first_name} {booking.customer_last_name}</div>
                                        <div className="text-xs text-white/50">{booking.customer_email}</div>
                                    </TableCell>
                                    <TableCell className="text-white/80 text-sm">
                                        <div>{new Date(booking.start_date).toLocaleString("de-DE", { dateStyle: 'short', timeStyle: 'short' })}</div>
                                        <div className="text-white/40">bis {new Date(booking.end_date).toLocaleString("de-DE", { dateStyle: 'short', timeStyle: 'short' })}</div>
                                    </TableCell>
                                    <TableCell className="text-white/80 capitalize">{booking.rental_type}</TableCell>
                                    <TableCell className="text-accent font-medium">{booking.total_price_eur} €</TableCell>
                                    <TableCell className="text-white/80">
                                        <Badge variant={booking.booking_status === 'paid' ? 'default' : booking.booking_status === 'cancelled' ? 'destructive' : 'secondary'}>
                                            {booking.booking_status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-white/80 capitalize">{booking.payment_method}</TableCell>
                                    <TableCell className="text-white/60 text-right text-xs">
                                        {new Date(booking.created_at).toLocaleDateString("de-DE")}
                                    </TableCell>
                                    <TableCell>
                                        <BookingActions bookingId={booking.id} status={booking.booking_status} />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
