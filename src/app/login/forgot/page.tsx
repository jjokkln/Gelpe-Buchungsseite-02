"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/dashboard/profile?reset=true`,
            });

            if (error) throw error;
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Ein Fehler ist aufgetreten.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex-1 flex items-center justify-center p-4 bg-muted/10 relative overflow-hidden min-h-screen">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <img
                    src="/images/auth/login-bg.jpeg"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl animate-fade-up">
                    <div className="mb-8 text-center">
                        <Link href="/" className="inline-block mb-8">
                            <span className="text-2xl font-serif text-white">Transporter Gelpe</span>
                        </Link>
                        <h1 className="text-3xl font-serif text-white mb-2">Passwort vergessen?</h1>
                        <p className="text-white/60">
                            Geben Sie Ihre E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen.
                        </p>
                    </div>

                    {success ? (
                        <div className="text-center space-y-6">
                            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-8 h-8" />
                            </div>
                            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-green-200">
                                Wir haben Ihnen einen Link zum Zurücksetzen Ihres Passworts gesendet. Bitte prüfen Sie Ihren Posteingang.
                            </div>
                            <Link href="/login">
                                <Button className="w-full bg-white text-black hover:bg-white/90">
                                    Zurück zum Login
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-white">E-Mail Adresse</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="max@mustermann.de"
                                        className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-offset-0"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-white text-black hover:bg-white/90"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sende Link...
                                    </>
                                ) : (
                                    "Link senden"
                                )}
                            </Button>

                            <div className="text-center">
                                <Link
                                    href="/login"
                                    className="inline-flex items-center text-sm text-white/60 hover:text-white transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Zurück zum Login
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
}
