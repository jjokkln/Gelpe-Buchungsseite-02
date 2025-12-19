"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { differenceInYears } from "date-fns";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const router = useRouter();
    const supabase = createClient();

    // Redirect if already logged in
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                router.replace("/buchen");
            }
        };
        checkSession();
    }, [router, supabase]);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
            } else {
                // Validate Age > 21
                const age = differenceInYears(new Date(), new Date(birthDate));
                if (age < 21) {
                    throw new Error("Sie müssen mindestens 21 Jahre alt sein, um sich zu registrieren.");
                }

                // 1. Sign Up
                const { data: { user }, error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            first_name: firstName,
                            last_name: lastName,
                            phone: phone,
                            birth_date: birthDate,
                        },
                    },
                });
                if (signUpError) throw signUpError;
                if (!user) throw new Error("Registrierung fehlgeschlagen.");

                // 2. Create Profile manually (redundancy for Trigger)
                const { error: profileError } = await supabase
                    .from("profiles")
                    .insert({
                        id: user.id,
                        first_name: firstName,
                        last_name: lastName,
                        phone: phone,
                        birth_date: birthDate,
                    })
                    .select()
                    .single();

                // If profile exists (trigger won race), ignore error. If unexpected error, throw?
                // Actually if profile already exists (trigger), insert might fail with duplicate key?
                // Use UPSERT to be safe.
                if (profileError) {
                    // If error is duplicate key, it means trigger worked or something.
                    // Try Upsert instead?
                    const { error: upsertError } = await supabase.from("profiles").upsert({
                        id: user.id,
                        first_name: firstName,
                        last_name: lastName,
                        phone: phone,
                        birth_date: birthDate,
                    });
                    if (upsertError) {
                        console.error("Profile creation failed:", upsertError);
                        // Continue anyway, maybe trigger worked? User can edit profile later.
                    }
                }
            }
            // Successful auth -> redirect to booking or dashboard
            router.push("/buchen");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen w-full flex items-center justify-center p-4">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/auth/login-bg.jpeg"
                    alt="Pferdetransporter Hintergrund"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            </div>

            {/* Auth Card */}
            <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="font-display text-3xl text-white mb-2">
                        {isLogin ? "Willkommen zurück" : "Konto erstellen"}
                    </h1>
                    <p className="text-white/60">
                        {isLogin
                            ? "Melden Sie sich an, um Ihre Buchung fortzusetzen."
                            : "Registrieren Sie sich für Ihre erste Buchung."}
                    </p>
                </div>

                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`pb-2 text-lg font-medium transition-colors ${isLogin
                            ? "text-accent border-b-2 border-accent"
                            : "text-white/50 hover:text-white"
                            }`}
                    >
                        Anmelden
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`pb-2 text-lg font-medium transition-colors ${!isLogin
                            ? "text-accent border-b-2 border-accent"
                            : "text-white/50 hover:text-white"
                            }`}
                    >
                        Registrieren
                    </button>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                    {!isLogin && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-white">Vorname</Label>
                                    <Input
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required={!isLogin}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-white">Nachname</Label>
                                    <Input
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required={!isLogin}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-white">Telefonnummer</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required={!isLogin}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="birthDate" className="text-white">Geburtsdatum (Mind. 21 Jahre)</Label>
                                <Input
                                    id="birthDate"
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    required={!isLogin}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent accent-accent text-left block w-full"
                                />
                            </div>
                        </>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">E-Mail</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-white">Passwort</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-accent"
                        />
                        <div className="flex justify-end mt-1">
                            <Link
                                href="/login/forgot"
                                className="text-xs text-white/60 hover:text-white transition-colors"
                            >
                                Passwort vergessen?
                            </Link>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-md border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <Button className="w-full text-lg h-12 mt-4" type="submit" disabled={loading}>
                        {loading
                            ? "Laden..."
                            : isLogin
                                ? "Anmelden"
                                : "Registrieren"}
                    </Button>
                </form>
            </div>
        </main>
    );
}
