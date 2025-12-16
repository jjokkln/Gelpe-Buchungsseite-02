"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Calendar, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const navItems = [
    { href: "/dashboard", label: "Meine Buchungen", icon: Calendar },
    { href: "/dashboard/profile", label: "Profil", icon: User },
    { href: "/dashboard/settings", label: "Einstellungen", icon: Settings },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/buchen");
        router.refresh();
    };

    return (
        <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white/5 rounded-2xl ring-1 ring-white/10 p-4 sticky top-24">
                <nav className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                    isActive
                                        ? "bg-accent/10 text-accent ring-1 ring-accent/20"
                                        : "text-white/70 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-8 pt-6 border-t border-white/10">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 px-4 text-white/50 hover:text-red-400 hover:bg-red-500/10"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Abmelden</span>
                    </Button>
                </div>
            </div>
        </aside>
    );
}
