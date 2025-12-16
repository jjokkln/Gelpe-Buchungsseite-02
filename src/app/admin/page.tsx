import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
    const supabase = await createClient();

    // Fetch stats (Parallel for performance)
    const [bookingsRes, usersRes] = await Promise.all([
        supabase.from("bookings").select("id, total_price_eur", { count: "exact" }),
        supabase.from("profiles").select("id", { count: "exact" })
    ]);

    const totalBookings = bookingsRes.count || 0;
    const totalRevenue = bookingsRes.data?.reduce((sum, b) => sum + (Number(b.total_price_eur) || 0), 0) || 0;
    const totalUsers = usersRes.count || 0;

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-display font-bold text-white mb-2">Dashboard Übersicht</h1>
                <p className="text-white/60">Willkommen im Administrationsbereich.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">Gesamt Buchungen</h3>
                    <p className="text-4xl font-bold text-white">{totalBookings}</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">Gesamt Umsatz</h3>
                    <p className="text-4xl font-bold text-accent">{totalRevenue.toFixed(2)} €</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">Registrierte Nutzer</h3>
                    <p className="text-4xl font-bold text-white">{totalUsers}</p>
                </div>
            </div>

            {/* Quick Actions or Recent could go here */}
        </div>
    );
}
