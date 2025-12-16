import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, Calendar, CalendarCheck, LogOut, Car } from "lucide-react";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/anmelden");
    }

    // Check Role
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "admin") {
        redirect("/");
    }

    return (
        <div className="flex h-screen bg-neutral-900 text-white font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-black/20 flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h2 className="font-display text-xl font-bold tracking-wide">
                        Admin<span className="text-accent">Panel</span>
                    </h2>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-white/80 hover:text-white">
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link href="/admin/bookings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-white/80 hover:text-white">
                        <Car className="h-5 w-5" />
                        Buchungen
                    </Link>
                    <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-white/80 hover:text-white">
                        <Users className="h-5 w-5" />
                        Benutzer
                    </Link>
                    <Link href="/admin/calendar" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-white/80 hover:text-white">
                        <Calendar className="h-5 w-5" />
                        Kalender
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-4 py-3 text-white/50 text-sm">
                        <LogOut className="h-4 w-4" />
                        <span>Angemeldet als Admin</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-neutral-950">
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
