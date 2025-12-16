import { Section } from "@/components/ui/section";
import Link from "next/link";
import { Truck, Video, Thermometer, Box, ShieldCheck } from "lucide-react";

const features = [
    {
        name: "2-Pferde-Kapazität",
        description: "Viel Platz für zwei Pferde mit verstellbaren Trennwänden.",
        icon: Truck,
    },
    {
        name: "Rückfahrkamera",
        description: "Kameraüberwachung für sicheres Rangieren und den Innenraum.",
        icon: Video,
    },
    {
        name: "Klimaanlage",
        description: "Angenehme Temperaturen für Fahrer und Pferde während der Fahrt.",
        icon: Thermometer,
    },
    {
        name: "Großer Stauraum",
        description: "Geräumige Sattelkammer für Equipment und Zubehör.",
        icon: Box,
    },
    {
        name: "Top Sicherheit",
        description: "Neueste Sicherheitsstandards und gepolsterter Innenraum.",
        icon: ShieldCheck,
    },
];

export function Features() {
    return (
        <Section variant="transparent" className="py-20 container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
                <h2 className="font-display text-3xl md:text-5xl text-white">
                    Sicher & Komfortabel
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto text-lg font-light">
                    Unser Peugeot-Transporter bietet alles, was Sie für einen entspannten Transport benötigen.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature) => (
                    <div
                        key={feature.name}
                        className="group rounded-2xl bg-white/5 ring-1 ring-white/10 p-8 hover:bg-white/10 transition-colors"
                    >
                        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-accent ring-1 ring-accent/40 group-hover:scale-110 transition-transform">
                            <feature.icon className="h-7 w-7" />
                        </div>
                        <h3 className="font-display text-xl font-semibold text-white mb-3">
                            {feature.name}
                        </h3>
                        <p className="text-white/60 leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}
                {/* Placeholder for visual balance or image if needed later */}
                <Link href="/buchen" className="block h-full">
                    <div className="rounded-2xl bg-gradient-to-br from-accent/20 to-primary-900/40 ring-1 ring-accent/20 p-8 flex items-center justify-center text-center h-full hover:scale-[1.02] transition-transform cursor-pointer">
                        <div className="space-y-2">
                            <p className="text-accent font-display text-xl">Bereit?</p>
                            <p className="text-white/80 text-sm">Prüfen Sie jetzt die Verfügbarkeit.</p>
                        </div>
                    </div>
                </Link>
            </div>
        </Section>
    );
}
