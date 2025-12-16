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

        // Check if we have a booking with this session ID
        // Note: We might want to use metadata.bookingId if we set it, 
        // but looking up by stripe_session_id is robust if we saved it on creation.

        // Attempt 1: Lookup by stripe_session_id
        const { data: booking, error: findError } = await supabase
            .from("bookings")
            .select("id")
            .eq("stripe_session_id", session.id)
            .single();

        if (booking) {
            // Update the booking status
            const { error: updateError } = await supabase
                .from("bookings")
                .update({
                    booking_status: "paid",
                    status: "paid", // Legacy support
                    updated_at: new Date().toISOString()
                })
                .eq("id", booking.id);

            if (updateError) {
                console.error("Error updating booking:", updateError);
                return new NextResponse("Database Error", { status: 500 });
            }
        } else {
            // Warning: Booking not found for this session.
            // This could happen if the DB insert failed but Stripe session was created?
            // Or generic webhook test.
            console.warn(`Booking not found for session: ${session.id}`);
        }
    }

    return new NextResponse(null, { status: 200 });
}
