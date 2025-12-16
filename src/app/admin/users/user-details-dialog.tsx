"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "lucide-react";

type Profile = {
    id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    phone: string | null;
    street: string | null;
    city: string | null;
    zip: string | null;
    role: string | null;
    created_at: string;
};

export function UserDetailsDialog({ user }: { user: Profile }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Details
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-neutral-900 border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle>Benutzerdetails</DialogTitle>
                    <DialogDescription className="text-white/60">
                        Informationen zu {user.first_name} {user.last_name}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="text-right text-white/60 text-sm">ID</span>
                        <span className="col-span-3 text-sm font-mono truncate">{user.id}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="text-right text-white/60 text-sm">Email</span>
                        <span className="col-span-3 text-sm">{user.email}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="text-right text-white/60 text-sm">Telefon</span>
                        <span className="col-span-3 text-sm">{user.phone || "-"}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="text-right text-white/60 text-sm">Adresse</span>
                        <div className="col-span-3 text-sm">
                            <div>{user.street || "-"}</div>
                            <div>{user.zip} {user.city}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="text-right text-white/60 text-sm">Rolle</span>
                        <span className="col-span-3 text-sm capitalize">{user.role || "user"}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <span className="text-right text-white/60 text-sm">Registriert</span>
                        <span className="col-span-3 text-sm">{new Date(user.created_at).toLocaleDateString("de-DE")}</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
