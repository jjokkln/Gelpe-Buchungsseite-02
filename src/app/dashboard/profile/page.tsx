"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { differenceInYears } from "date-fns";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const searchParams = useSearchParams();
    const isReset = searchParams.get("reset") === "true";

    // Password State
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    const [profile, setProfile] = useState<any>({});
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        async function loadProfile() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
                return;
            }
            setUser(user);

            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

            if (data) {
                setProfile(data);
            } else {
                setProfile({
                    id: user.id,
                    first_name: "",
                    last_name: "",
                    phone: "",
                    birth_date: "",
                    address_street: "",
                    address_zip: "",
                    address_city: ""
                });
            }
            setLoading(false);
        }
        loadProfile();
    }, [router, supabase]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        // Age Validation
        if (profile.birth_date) {
            const age = differenceInYears(new Date(), new Date(profile.birth_date));
            if (age < 21) {
                alert("Sie müssen mindestens 21 Jahre alt sein.");
                setSaving(false);
                return;
            }
        }

        const { error } = await supabase
            .from("profiles")
            .upsert({
                id: user.id,
                email: user.email,
                first_name: profile.first_name,
                last_name: profile.last_name,
                phone: profile.phone,
                birth_date: profile.birth_date,
                address_street: profile.address_street,
                address_zip: profile.address_zip,
                address_city: profile.address_city,
                updated_at: new Date().toISOString(),
            });

        if (error) {
            alert(`Fehler beim Speichern: ${error.message}`);
        } else {
            alert("Profil aktualisiert");
        }
        setSaving(false);
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError("");
        setPasswordSuccess("");

        if (password !== confirmPassword) {
            setPasswordError("Passwörter stimmen nicht überein");
            return;
        }

        if (password.length < 6) {
            setPasswordError("Passwort muss mindestens 6 Zeichen lang sein");
            return;
        }

        setSaving(true);
        const { error } = await supabase.auth.updateUser({ password: password });

        if (error) {
            setPasswordError(error.message);
        } else {
            setPasswordSuccess("Passwort erfolgreich geändert");
            setPassword("");
            setConfirmPassword("");
        }
        setSaving(false);
    };

    if (loading) return <div className="p-8 text-white">Lade Profil...</div>;

    return (
        <div className="flex-1 p-8 space-y-8">
            <h2 className="text-xl font-display text-white mb-6">Einstellungen</h2>

            <div className="space-y-8">
                {/* Profile Edit Section */}
                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Profil bearbeiten</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-white">Vorname</Label>
                                    <Input
                                        id="firstName"
                                        value={profile.first_name || ""}
                                        onChange={e => setProfile({ ...profile, first_name: e.target.value })}
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-white">Nachname</Label>
                                    <Input
                                        id="lastName"
                                        value={profile.last_name || ""}
                                        onChange={e => setProfile({ ...profile, last_name: e.target.value })}
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-white">Telefonnummer</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={profile.phone || ""}
                                    onChange={e => setProfile({ ...profile, phone: e.target.value })}
                                    className="bg-white/5 border-white/10 text-white"
                                    placeholder="+49 ..."
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="birthDate" className="text-white">Geburtsdatum</Label>
                                <Input
                                    id="birthDate"
                                    type="date"
                                    value={profile.birth_date || ""}
                                    onChange={e => setProfile({ ...profile, birth_date: e.target.value })}
                                    className="accent-accent bg-white/5 border-white/10 text-white"
                                />
                            </div>

                            <div className="space-y-4 pt-4 border-t border-white/10">
                                <h3 className="text-lg text-white font-display">Adresse</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="street" className="text-white">Straße & Hausnummer</Label>
                                    <Input
                                        id="street"
                                        value={profile.address_street || ""}
                                        onChange={e => setProfile({ ...profile, address_street: e.target.value })}
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="zip" className="text-white">PLZ</Label>
                                        <Input
                                            id="zip"
                                            value={profile.address_zip || ""}
                                            onChange={e => setProfile({ ...profile, address_zip: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <Label htmlFor="city" className="text-white">Stadt</Label>
                                        <Input
                                            id="city"
                                            value={profile.address_city || ""}
                                            onChange={e => setProfile({ ...profile, address_city: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="submit" disabled={saving} size="lg">
                                    {saving ? "Speichere..." : "Änderungen speichern"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Password Change Section */}
                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <Lock className="w-5 h-5 text-accent" />
                            Sicherheit & Passwort
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isReset && (
                            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-200">
                                Bitte legen Sie ein neues Passwort fest, um den Zugriff auf Ihr Konto wiederherzustellen.
                            </div>
                        )}
                        <form onSubmit={handlePasswordUpdate} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="new-password text-white">Neues Passwort</Label>
                                <Input
                                    id="new-password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirm-password text-white">Passwort bestätigen</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>

                            {passwordError && (
                                <p className="text-red-400 text-sm">{passwordError}</p>
                            )}
                            {passwordSuccess && (
                                <p className="text-green-400 text-sm">{passwordSuccess}</p>
                            )}

                            <div className="flex justify-end">
                                <Button type="submit" disabled={saving} variant="outline" className="text-white border-white/10 hover:bg-white/5">
                                    Passwort ändern
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
