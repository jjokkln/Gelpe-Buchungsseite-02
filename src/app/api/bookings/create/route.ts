import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { type SupabaseClient } from "@supabase/supabase-js";

import { TARIFF_PRICES } from "@/config/tariffs";

interface BookingRequest {
    startDate: string;
    endDate: string;
    paymentMethod: "stripe" | "cash";
    tariff: string;
    extraKm?: number;
}

// STRICT VALIDATION HELPER
async function checkAvailability(supabase: SupabaseClient, start: Date, end: Date) {
    // Check for overlapping bookings
    // Logic: Existing Booking Start < Requested End  AND  Existing Booking End > Requested Start
    const { data, error } = await supabase
        .from('bookings')
        .select('id')
        .in('booking_status', ['reserved', 'paid'])
        .lt('start_date', end.toISOString())
        .gt('end_date', start.toISOString());

    if (error) throw error;

    // Check for overlapping blocked dates
    const { data: blocked, error: blockError } = await supabase
        .from('blocked_dates')
        .select('id')
        .lt('start_date', end.toISOString())
        .gt('end_date', start.toISOString());

    if (blockError) throw blockError;

    // If any bookings or blocks overlap, return false
    if ((data && data.length > 0) || (blocked && blocked.length > 0)) {
        return false;
    }
    return true;
}

export async function POST(request: Request) {
    try {
        const body: BookingRequest = await request.json();
        const { startDate, endDate, paymentMethod, tariff, extraKm = 0 } = body;

        const supabase = await createClient();

        // 1. Security: Authenticate User
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const userId = user.id;

        // 2. Fetch User Profile for Customer Data
        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();

        if (profileError || !profile) {
            return NextResponse.json({ error: "Profile not found. Please update your profile first." }, { status: 400 });
        }

        // 3. Validation: Price based on Tariff
        if (!tariff || !TARIFF_PRICES[tariff as keyof typeof TARIFF_PRICES]) {
            return NextResponse.json({ error: "Invalid tariff" }, { status: 400 });
        }
        const basePrice = TARIFF_PRICES[tariff as keyof typeof TARIFF_PRICES];
        const extraKmPrice = Math.max(0, Number(extraKm)) * 0.45;
        const totalPrice = Number((basePrice + extraKmPrice).toFixed(2));

        const start = new Date(startDate);
        const end = new Date(endDate);

        // 4. Availability Check
        const isAvailable = await checkAvailability(supabase, start, end);
        if (!isAvailable) {
            return NextResponse.json({ error: "Booking conflict. The selected period overlaps with an existing booking." }, { status: 409 });
        }

        const bookingPayload = {
            user_id: userId,
            start_date: start.toISOString(),
            end_date: end.toISOString(),
            total_price_eur: totalPrice, // Correct column
            total_price: totalPrice,     // Legacy support
            booking_status: "reserved",  // Enum column
            status: "reserved",          // Legacy text column
            rental_type: tariff,
            customer_first_name: profile.first_name || "Unbekannt",
            customer_last_name: profile.last_name || "Unbekannt",
            customer_email: user.email || "unknown@example.com",
            customer_phone: profile.phone || "Nicht angegeben",
        };

        if (paymentMethod === "cash") {
            // 4. Insert into DB (Cash)
            const { error } = await supabase.from("bookings").insert({
                ...bookingPayload,
                payment_method: "cash",
            });

            if (error) {
                console.error("DB Error:", error);
                return NextResponse.json({ error: error.message }, { status: 500 });
            }
            return NextResponse.json({ success: true });
        }

        // 5. Create Stripe Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: `Pferdetransporter - ${tariff}`,
                            description: `${start.toLocaleString("de-DE")} - ${end.toLocaleString("de-DE")} ${extraKm > 0 ? `(+ ${extraKm} km)` : ""}`,
                        },
                        unit_amount: Math.round(totalPrice * 100), // Cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/buchen?canceled=true`,
            metadata: {
                userId,
                startDate: startDate,
                endDate: endDate,
                tariff,
                extraKm: String(extraKm)
            }
        });

        // 6. Insert into DB (Stripe)
        const { error } = await supabase.from("bookings").insert({
            ...bookingPayload,
            payment_method: "stripe",
            stripe_session_id: session.id
        });

        if (error) {
            console.error("DB Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ url: session.url });
    } catch (err: unknown) {
        console.error("API Error:", err);
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
