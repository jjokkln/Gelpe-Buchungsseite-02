"use client";

import { useState, useEffect } from "react";
import { Section } from "@/components/ui/section";
import { DateStep } from "@/components/booking/date-step";
import { PaymentStep } from "@/components/booking/payment-step";
import { ConfirmationStep } from "@/components/booking/confirmation-step";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

import { BookingSummary } from "@/components/booking/booking-summary";

export default function BookingPage() {
    const [step, setStep] = useState(1);
    const [bookingData, setBookingData] = useState<any>({});
    const supabase = createClient();
    // Firewall removed to allow guests to view prices.
    // Auth check moved to PaymentStep.
    const [loading, setLoading] = useState(false);

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl min-h-screen">

            {/* Progress Indicator */}
            <div className="max-w-2xl mx-auto mb-12">
                <div className="flex justify-between items-center px-4">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`flex flex-col items-center gap-2 ${step >= s ? 'text-accent' : 'text-white/30'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold transition-all
                       ${step >= s ? 'border-accent bg-accent/10' : 'border-white/30'}
                       ${step === s ? 'ring-2 ring-accent/50 ring-offset-2 ring-offset-black' : ''}
                   `}>
                                {s}
                            </div>
                            <span className="text-xs uppercase tracking-wider hidden sm:block">
                                {s === 1 ? 'Zeitraum' : s === 2 ? 'Zahlung' : 'Fertig'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">

                {/* Main Content (Steps) */}
                <div className="lg:col-span-2">
                    <Section variant="glass" className="p-6 md:p-8 min-h-[500px]">
                        {step === 1 && (
                            <DateStep
                                onNext={() => setStep(2)}
                                setBookingData={setBookingData}
                            />
                        )}

                        {step === 2 && (
                            <PaymentStep
                                bookingData={bookingData}
                                onNext={() => setStep(3)}
                            />
                        )}

                        {step === 3 && (
                            <ConfirmationStep />
                        )}
                    </Section>
                </div>

                {/* Sidebar (Summary) */}
                <div className="lg:col-span-1">
                    <BookingSummary bookingData={bookingData} step={step} />
                </div>

            </div>
        </div>
    );
}
