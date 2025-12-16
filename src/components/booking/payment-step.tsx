import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function PaymentStep({ bookingData, onNext }: { bookingData: any, onNext: () => void }) {
    const [agb, setAgb] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        checkUser();

        // Listen for auth changes (e.g. login in popup or redirect)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                // Optional: refresh router to ensure server components update
                router.refresh();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase, router]);

    const handlePayment = async (method: "cash" | "stripe") => {
        setLoading(true);
        try {
            if (!user) {
                router.push("/login?redirect=/buchen");
                return;
            }

            const response = await fetch("/api/bookings/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    startDate: bookingData.startDate,
                    endDate: bookingData.endDate,
                    tariff: bookingData.tariff, // Pass Tariff
                    paymentMethod: method,
                }),
            });

            const data = await response.json();

            if (data.url) {
                // Stripe Redirect
                window.location.href = data.url;
            } else if (data.success) {
                // Cash Success
                onNext();
            } else {
                throw new Error(data.error || "Fehler bei der Buchung");
            }

        } catch (error: any) {
            console.error(error);
            alert(error.message || "Fehler bei der Buchung.");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="bg-white/5 p-8 rounded-2xl ring-1 ring-white/10 text-center space-y-6">
                <h3 className="font-display text-2xl text-white">Anmeldung erforderlich</h3>
                <p className="text-white/60">Bitte melden Sie sich an, um die Buchung abzuschließen.</p>
                <Button onClick={() => router.push("/login?redirect=/buchen")} className="w-full max-w-sm">
                    Jetzt Anmelden / Registrieren
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-white/5 p-6 rounded-2xl ring-1 ring-white/10">
                <h3 className="font-display text-xl text-white mb-4">Zusammenfassung</h3>
                <div className="space-y-2 text-white/80">
                    <div className="flex justify-between">
                        <span>Tariff:</span>
                        <span className="font-medium text-white capitalize">{bookingData.tariff}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Zeitraum:</span>
                        <span>{bookingData.startDate?.toLocaleString()} - {bookingData.endDate?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-white pt-2 border-t border-white/10">
                        <span>Gesamtbetrag:</span>
                        <span className="text-xl text-accent">{bookingData.price} €</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-start space-x-3">
                    <Checkbox id="agb" checked={agb} onCheckedChange={(c: boolean | 'indeterminate') => setAgb(c === true)} />
                    <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="agb" className="text-white/80 font-normal">
                            Ich akzeptiere die <a href="/agb" className="text-accent underline" target="_blank">AGB</a> und die <a href="/datenschutz" className="text-accent underline" target="_blank">Datenschutzbestimmungen</a>.
                        </Label>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <Button
                    onClick={() => handlePayment("cash")}
                    disabled={!agb || loading}
                    variant="outline"
                    className="w-full h-14 bg-transparent border-white/20 text-white hover:bg-white/10"
                >
                    Barzahlung bei Abholung
                </Button>
                <Button
                    onClick={() => handlePayment("stripe")}
                    disabled={!agb || loading}
                    className="w-full h-14 font-bold shadow-lg shadow-accent/10"
                >
                    Online bezahlen (Karte)
                </Button>
            </div>
        </div>
    );
}
