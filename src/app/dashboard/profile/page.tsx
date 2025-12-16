"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { differenceInYears } from "date-fns";

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState<any>({});
    const supabase = createClient();

    useEffect(() => {
        const loadProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (data) {
                    setProfile(data);
                } else {
                    // Init with empty values to avoid uncontrolled input warnings
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
            }
            setLoading(false);
        };
        loadProfile();
    }, [supabase]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Nicht eingeloggt");

            // Age Validation
            if (profile.birth_date) {
                const age = differenceInYears(new Date(), new Date(profile.birth_date));
                if (age < 21) throw new Error("Sie müssen mindestens 21 Jahre alt sein.");
            }

            const updates = {
                id: user.id,
                email: user.email,
                ...profile,
                updated_at: new Date().toISOString(),
            };

            const { error } = await supabase.from('profiles').upsert(updates);
            if (error) throw error;
            alert("Profil gespeichert!");
        } catch (error: any) {
            console.error("Save error:", error);
            alert(`Fehler beim Speichern: ${error.message || "Unbekannter Fehler"}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-white">Lade Profil...</div>;

    return (
        <div className="bg-white/5 rounded-2xl ring-1 ring-white/10 p-6 md:p-8 max-w-2xl">
            <h2 className="text-xl font-display text-white mb-6">Profil bearbeiten</h2>

            <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">Vorname</Label>
                        <Input
                            id="firstName"
                            value={profile.first_name || ""}
                            onChange={e => setProfile({ ...profile, first_name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Nachname</Label>
                        <Input
                            id="lastName"
                            value={profile.last_name || ""}
                            onChange={e => setProfile({ ...profile, last_name: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Telefonnummer</Label>
                    <Input
                        id="phone"
                        type="tel"
                        value={profile.phone || ""}
                        onChange={e => setProfile({ ...profile, phone: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="birthDate">Geburtsdatum</Label>
                    <Input
                        id="birthDate"
                        type="date"
                        value={profile.birth_date || ""}
                        onChange={e => setProfile({ ...profile, birth_date: e.target.value })}
                        className="accent-accent"
                    />
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                    <h3 className="text-lg text-white font-display">Adresse</h3>
                    <div className="space-y-2">
                        <Label htmlFor="street">Straße & Hausnummer</Label>
                        <Input
                            id="street"
                            value={profile.address_street || ""}
                            onChange={e => setProfile({ ...profile, address_street: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="zip">PLZ</Label>
                            <Input
                                id="zip"
                                value={profile.address_zip || ""}
                                onChange={e => setProfile({ ...profile, address_zip: e.target.value })}
                            />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="city">Stadt</Label>
                            <Input
                                id="city"
                                value={profile.address_city || ""}
                                onChange={e => setProfile({ ...profile, address_city: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <Button type="submit" disabled={saving} size="lg">
                    {saving ? "Speichere..." : "Änderungen speichern"}
                </Button>
            </form>
        </div>
    );
}
