import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const supabase = await createClient();
        const metadata = session.metadata;

        if (!metadata || !metadata.userId || !metadata.startDate || !metadata.endDate) {
            console.error("Missing booking metadata in Stripe session:", session.id);
            return new NextResponse("Missing metadata", { status: 400 });
        }

        const startDate = metadata.startDate;
        const endDate = metadata.endDate;

        // 1. Availability Check (Race Condition Protection)
        // Ensure the slot wasn't taken while the user was paying.
        const { count: conflictCount, error: conflictError } = await supabase
            .from('bookings')
            .select('id', { count: 'exact', head: true })
            .in('booking_status', ['reserved', 'paid'])
            .lt('start_date', endDate)
            .gt('end_date', startDate);

        const { count: blockConflictCount } = await supabase
            .from('blocked_dates')
            .select('id', { count: 'exact', head: true })
            .lt('start_date', endDate)
            .gt('end_date', startDate);

        if ((conflictCount && conflictCount > 0) || (blockConflictCount && blockConflictCount > 0)) {
            console.error(`CRITICAL: Slot taken for paid session ${session.id}. User charged but booking failed. Manual Refund Required.`);
            // Return 200 to acknowledge receipt and stop Stripe retries. 
            // We cannot fix this programmatically easily without a refund logic, which requires secret key permissions.
            return new NextResponse("Slot taken", { status: 200 });
        }

        // 2. Create Booking
        // Use the actual amount paid (in case of promo codes)
        const amountPaidEur = session.amount_total ? session.amount_total / 100 : Number(metadata.totalPrice);

        const bookingPayload = {
            user_id: metadata.userId,
            start_date: startDate,
            end_date: endDate,
            total_price_eur: amountPaidEur,
            total_price: amountPaidEur, // Legacy
            booking_status: "paid",
            status: "paid",
            payment_method: "stripe",
            stripe_session_id: session.id,
            rental_type: metadata.tariff,
            customer_first_name: metadata.firstName,
            customer_last_name: metadata.lastName,
            customer_email: metadata.email,
            customer_phone: metadata.phone,
        };

        const { error: insertError } = await supabase
            .from("bookings")
            .insert(bookingPayload);

        if (insertError) {
            console.error("Error creating booking from webhook:", insertError);
            return new NextResponse("Database Error", { status: 500 });
        }
    }

    return new NextResponse(null, { status: 200 });
}
