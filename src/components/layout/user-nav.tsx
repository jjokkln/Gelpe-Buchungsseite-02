"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut, User, LayoutDashboard, Settings } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserNavProps {
    user: any;
    profile: any;
}

export function UserNav({ user, profile }: UserNavProps) {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
        router.push("/");
    };

    const initials = profile?.first_name
        ? `${profile.first_name[0]}${profile.last_name ? profile.last_name[0] : ""}`
        : user.email?.[0]?.toUpperCase() || "U";

    const displayName = profile?.first_name || user.email?.split("@")[0] || "Benutzer";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 bg-accent text-primary-950 font-bold border border-white/10">
                        <AvatarFallback className="bg-accent text-primary-950">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                className="w-64 bg-primary-950/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-2 relative overflow-hidden" 
                align="end" 
                forceMount
            >
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                    <DropdownMenuLabel className="font-normal p-3">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-bold text-white leading-none">{displayName}</p>
                            <p className="text-xs leading-none text-white/50">
                                {user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer w-full flex items-center p-3 rounded-xl hover:bg-white/10 focus:bg-white/10 text-white/80 hover:text-white transition-colors outline-none">
                            <LayoutDashboard className="mr-3 h-4 w-4" />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/profile" className="cursor-pointer w-full flex items-center p-3 rounded-xl hover:bg-white/10 focus:bg-white/10 text-white/80 hover:text-white transition-colors outline-none">
                            <User className="mr-3 h-4 w-4" />
                            <span>Profil</span>
                        </Link>
                    </DropdownMenuItem>
                    {profile?.role === 'admin' && (
                        <DropdownMenuItem asChild>
                            <Link href="/admin/bookings" className="cursor-pointer w-full flex items-center p-3 rounded-xl hover:bg-white/10 focus:bg-white/10 text-white/80 hover:text-white transition-colors outline-none">
                                <Settings className="mr-3 h-4 w-4" />
                                <span>Admin Bereich</span>
                            </Link>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer w-full flex items-center p-3 rounded-xl hover:bg-red-500/10 focus:bg-red-500/10 text-red-400 hover:text-red-300 focus:text-red-300 transition-colors outline-none mt-1">
                        <LogOut className="mr-3 h-4 w-4" />
                        <span>Abmelden</span>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
