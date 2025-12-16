import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export function ConfirmationStep() {
    return (
        <div className="max-w-md mx-auto text-center space-y-8 py-12">
            <div className="flex justify-center">
                <CheckCircle className="h-24 w-24 text-accent" />
            </div>
            <div className="space-y-4">
                <h2 className="font-display text-3xl text-white">Buchung erfolgreich!</h2>
                <p className="text-white/70">
                    Vielen Dank für Ihre Buchung. Sie erhalten in Kürze eine Bestätigung per E-Mail.
                    Bitte bringen Sie zur Abholung Ihren Führerschein mit.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <Link href="/dashboard">
                    <Button className="w-full" size="lg">Zum Dashboard</Button>
                </Link>
                <Link href="/">
                    <Button variant="outline" className="w-full">Zur Startseite</Button>
                </Link>
            </div>
        </div>
    );
}
