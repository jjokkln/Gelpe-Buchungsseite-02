import { Section } from "@/components/ui/section";

export const metadata = {
    title: "AGB & Mietbedingungen | Pferdetransporter Gelpe",
};

export default function AGBPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
            <Section className="space-y-8">
                <h1 className="font-display text-4xl text-white mb-8">Allgemeine Geschäftsbedingungen</h1>

                <div className="space-y-8 text-white/80 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. Geltungsbereich</h2>
                        <p>
                            Diese Allgemeinen Geschäftsbedingungen gelten für die Vermietung von Pferdetransportern der Bergischen Reitsport-Akademie Gelpe.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. Vertragsabschluss & Buchung</h2>
                        <p>
                            Die Buchung erfolgt online. Mit Absenden der Buchung und Akzeptieren dieser AGB kommt ein verbindlicher Mietvertrag zustande.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. Mietpreise & Zahlung</h2>
                        <p>
                            Es gelten die auf der Website ausgewiesenen Preise. Die Zahlung kann per Stripe (Kreditkarte) oder bar vor Ort erfolgen.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. Kaution</h2>
                        <p>
                            Vor Fahrtantritt ist eine Kaution in Höhe von <strong>500 €</strong> zu hinterlegen. Diese wird nach ordnungsgemäßer Rückgabe des Fahrzeugs erstattet.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">5. Stornierung</h2>
                        <p>
                            Bei Stornierung bis zu 48 Stunden vor Mietbeginn fällt eine Bearbeitungsgebühr von <strong>25 €</strong> an. Bei späterer Stornierung kann der volle Mietpreis berechnet werden.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">6. Pflichten des Mieters</h2>
                        <p>
                            Der Mieter verpflichtet sich, das Fahrzeug pfleglich zu behandeln und alle geltenden gesetzlichen Vorschriften einzuhalten. Führerscheinklasse B ist i.d.R. ausreichend, muss aber eigenverantwortlich geprüft werden.
                        </p>
                    </section>
                </div>
            </Section>
        </div>
    );
}
