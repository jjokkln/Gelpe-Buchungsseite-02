import { createClient } from "@/lib/supabase/server";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserDetailsDialog } from "./user-details-dialog";

export default async function AdminUsersPage() {
    const supabase = await createClient();

    const { data: users, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return <div className="text-red-500">Fehler beim Laden der Benutzer: {error.message}</div>
    }

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-display font-bold text-white">Benutzer Verwaltung</h1>
                <div className="bg-white/10 px-4 py-2 rounded-full text-sm text-white/70">
                    {users?.length || 0} Registriert
                </div>
            </header>

            <div className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/10 hover:bg-transparent">
                            <TableHead className="text-white/60">Name</TableHead>
                            <TableHead className="text-white/60">Email</TableHead>
                            <TableHead className="text-white/60">Adresse</TableHead>
                            <TableHead className="text-white/60">Telefon</TableHead>
                            <TableHead className="text-white/60">Rolle</TableHead>
                            <TableHead className="text-white/60">Registriert</TableHead>
                            <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.map((user) => (
                            <TableRow key={user.id} className="border-white/10 hover:bg-white/5">
                                <TableCell className="font-medium text-white">
                                    {user.first_name || "-"} {user.last_name || "-"}
                                </TableCell>
                                <TableCell className="text-white/80">{user.email}</TableCell>
                                <TableCell className="text-white/80">
                                    {user.address_street}, {user.address_zip} {user.address_city}
                                </TableCell>
                                <TableCell className="text-white/80">{user.phone || "-"}</TableCell>
                                <TableCell className="text-white/80">
                                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${user.role === 'admin' ? 'bg-accent/20 text-accent' : 'bg-white/10 text-white/60'
                                        }`}>
                                        {user.role || 'user'}
                                    </span>
                                </TableCell>
                                <TableCell className="text-white/60 text-right">
                                    {user.created_at ? new Date(user.created_at).toLocaleDateString("de-DE") : "-"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
