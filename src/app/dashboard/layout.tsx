import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Section } from "@/components/ui/section";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/buchen");
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 min-h-screen">
            <h1 className="text-3xl font-display text-white mb-8">Mein Bereich</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <DashboardSidebar />
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
