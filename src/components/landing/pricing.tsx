import { Section } from "@/components/ui/section";
import { Check, Info } from "lucide-react";

const tariffs = [
    { name: "Halbtagesmiete", price: "88 €", km: "100 km", extra: "0,45 €/km" },
    { name: "Ganztagesmiete", price: "169 €", km: "200 km", extra: "0,45 €/km", popular: true },
    { name: "Wochenendtarif", price: "290 €", km: "400 km", extra: "0,45 €/km" },
    { name: "Wochentarif", price: "999 €", km: "1000 km", extra: "0,45 €/km" },
];

export function Pricing() {
    return (
        <Section variant="glass" id="preise" className="py-20 my-20 container mx-auto rounded-3xl">
            <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-5xl text-white mb-6">
                    Transparente Preise
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                    Keine versteckten Kosten. Wählen Sie den Tarif, der zu Ihrem Vorhaben passt.
                </p>
            </div>

            {/* Table Layout for Desktop */}
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5 text-sm font-medium text-white/60 uppercase tracking-wider">
                            <th className="p-6">Tarif</th>
                            <th className="p-6">Inklusive km</th>
                            <th className="p-6">Preis</th>
                            <th className="p-6 hidden sm:table-cell">Zusatz-km</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-white">
                        {tariffs.map((tariff) => (
                            <tr
                                key={tariff.name}
                                className={`group transition-colors hover:bg-white/5 ${tariff.popular ? 'bg-accent/5' : ''}`}
                            >
                                <td className="p-6 font-display font-semibold text-lg flex items-center gap-3">
                                    {tariff.name}
                                    {tariff.popular && (
                                        <span className="text-[10px] sm:text-xs bg-accent text-black px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                                            Beliebt
                                        </span>
                                    )}
                                </td>
                                <td className="p-6 text-white/80">{tariff.km}</td>
                                <td className="p-6 font-bold text-accent text-xl">{tariff.price}</td>
                                <td className="p-6 text-white/60 hidden sm:table-cell text-sm">{tariff.extra}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Additional Costs Info */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-white/80">
                <div className="flex items-start gap-4 p-6 rounded-xl bg-white/5 ring-1 ring-white/10">
                    <Info className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <h4 className="font-semibold text-white">Kaution</h4>
                        <p className="text-sm">Eine Kaution von <span className="text-white font-medium">500 €</span> ist vor Fahrtantritt zu hinterlegen (bar oder reserviert per Kreditkarte).</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-6 rounded-xl bg-white/5 ring-1 ring-white/10">
                    <Check className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <h4 className="font-semibold text-white">Reinigung</h4>
                        <p className="text-sm">Übergabe sauber, Rückgabe sauber. Optional bieten wir eine Endreinigung für <span className="text-white font-medium">45 €</span> an.</p>
                    </div>
                </div>
            </div>
        </Section>
    );
}
