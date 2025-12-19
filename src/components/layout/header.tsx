"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { UserNav } from "@/components/layout/user-nav";

const navigation = [
    { name: "Start", href: "/" },
    { name: "Buchen", href: "/buchen" },
    { name: "Preise", href: "/#preise" },
    { name: "FAQ", href: "/faq" },
    { name: "Kontakt", href: "/kontakt" },
];

export function Header() {
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [mounted, setMounted] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        setMounted(true);
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('first_name')
                    .eq('id', user.id)
                    .single();
                setProfile(profile);
            }
        };
        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('first_name')
                    .eq('id', session.user.id)
                    .single();
                setProfile(profile);
            } else {
                setProfile(null);
            }
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    return (
        <header className="sticky top-0 z-50 w-full bg-primary-950/80 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative h-12 w-auto aspect-square overflow-hidden rounded-full ring-1 ring-white/10">
                        <Image
                            src="/images/logo.png"
                            alt="Pferdetransporter Gelpe Logo"
                            width={100}
                            height={100}
                            className="object-cover h-full w-full"
                        />
                    </div>
                    <span className="font-display font-bold text-xl hidden sm:block tracking-wide">
                        Pferdetransporter<span className="text-accent">Gelpe</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-accent",
                                    isActive
                                        ? "text-accent border-b-2 border-accent pb-1"
                                        : "text-white/80"
                                )}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* CTA & Auth */}
                <div className="flex items-center gap-4">
                    {mounted ? (
                        user ? (
                            <UserNav user={user} profile={profile} />
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button asChild variant="ghost" className="text-white hover:text-accent hidden sm:inline-flex">
                                    <Link href="/login">Login</Link>
                                </Button>
                            </div>
                        )
                    ) : (
                        // Loading placeholder or default to booking button to avoid flicker
                        <Button asChild className="hidden sm:inline-flex shadow-xl shadow-accent/10 opacity-50">
                            <span className="text-transparent">Loading</span>
                        </Button>
                    )}

                    {/* Mobile Menu Toggle could go here */}
                </div>
            </div>
        </header>
    );
}
