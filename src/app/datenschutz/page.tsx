import { Section } from "@/components/ui/section";

export const metadata = {
    title: "Datenschutz | Pferdetransporter Gelpe",
};

export default function DatenschutzPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
            <Section className="space-y-8">
                <h1 className="font-display text-4xl text-white mb-8">Datenschutzerklärung</h1>

                <div className="space-y-8 text-white/80 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. Datenschutz auf einen Blick</h2>
                        <p>
                            Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Nachfolgend informieren wir Sie über die Verarbeitung personenbezogener Daten bei Nutzung unserer Website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. Datenerfassung auf unserer Website</h2>
                        <p>
                            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z.B. im Buchungsformular). Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst (z.B. techn. Daten).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. Buchungsprozess</h2>
                        <p>
                            Zur Abwicklung des Mietvertrags erheben wir personenbezogene Daten wie Name, Anschrift und Kontaktdaten. Diese Daten werden ausschließlich zur Vertragserfüllung genutzt.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. Zahlungsdienstleister</h2>
                        <p>
                            Bei Zahlung via Stripe werden Ihre Zahlungsdaten an Stripe weitergeleitet. Wir selbst speichern keine vollständigen Kreditkartendaten.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">5. Ihre Rechte</h2>
                        <p>
                            Sie haben jederzeit das Recht auf Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
                        </p>
                    </section>
                </div>
            </Section>
        </div>
    );
}
