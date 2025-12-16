import { Section } from "@/components/ui/section";

export const metadata = {
    title: "Impressum | Pferdetransporter Gelpe",
};

export default function ImpressumPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
            <Section className="space-y-8">
                <h1 className="font-display text-4xl text-white mb-8">Impressum</h1>

                <div className="space-y-6 text-white/80 leading-relaxed">
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-2">Angaben gemäß § 5 TMG</h2>
                        <p>
                            Bergische Reitsport-Akademie Gelpe<br />
                            Dorner Weg 37<br />
                            42349 Wuppertal<br />
                            Deutschland
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-white mb-2">Kontakt</h2>
                        <p>
                            Telefon: +49 123 4567890<br />
                            E-Mail: info@pferdetransporter-gelpe.de
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-white mb-2">Umsatzsteuer-ID</h2>
                        <p>
                            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                            DE 123456789 (Platzhalter)
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-white mb-2">Haftungsausschluss</h2>
                        <p className="text-sm text-white/60">
                            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
                        </p>
                    </div>
                </div>
            </Section>
        </div>
    );
}
