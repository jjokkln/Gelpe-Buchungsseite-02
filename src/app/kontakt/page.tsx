import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    return (
        <div className="flex-1 flex flex-col min-h-screen pt-20"> {/* pt-20 for fixed header */}
            <Section variant="glass" className="flex-1 flex flex-col justify-center py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <h1 className="font-display text-4xl md:text-6xl text-white">
                            Kontakt & <span className="text-accent">Anfahrt</span>
                        </h1>
                        <p className="text-white/70 max-w-2xl mx-auto text-lg font-light">
                            Wir freuen uns auf Ihre Anfrage. Besuchen Sie uns auf der Bergischen Reitsport-Akademie Gelpe.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

                        {/* Contact Info Side */}
                        <div className="space-y-12">
                            {/* Info Cards */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-colors">
                                    <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                                        <MapPin className="h-6 w-6 text-accent" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-display font-semibold text-white">Adresse</h3>
                                        <address className="not-italic text-white/70 leading-relaxed">
                                            Bergische Reitsport-Akademie Gelpe <br />
                                            Dorner Weg 37 <br />
                                            42349 Wuppertal
                                        </address>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-colors">
                                    <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                                        <Phone className="h-6 w-6 text-accent" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-display font-semibold text-white">Telefon</h3>
                                        <p className="text-white/70 mb-2">Für Buchungsanfragen und Notfälle.</p>
                                        <a href="tel:+491234567890" className="text-xl font-medium text-white hover:text-accent transition-colors">
                                            +49 123 4567890
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-colors">
                                    <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                                        <Mail className="h-6 w-6 text-accent" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-display font-semibold text-white">E-Mail</h3>
                                        <p className="text-white/70 mb-2">Schreiben Sie uns jederzeit.</p>
                                        <a href="mailto:info@pferdetransporter-gelpe.de" className="text-xl font-medium text-white hover:text-accent transition-colors">
                                            info@pferdetransporter-gelpe.de
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-colors">
                                    <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                                        <Clock className="h-6 w-6 text-accent" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-display font-semibold text-white">Öffnungszeiten</h3>
                                        <div className="text-white/70 space-y-1">
                                            <p><span className="text-white font-medium w-24 inline-block">Mo - Fr:</span> 08:00 - 18:00 Uhr</p>
                                            <p><span className="text-white font-medium w-24 inline-block">Sa & So:</span> Nach Absprache</p>
                                            <p className="text-sm text-white/50 pt-2">Abholung und Rückgabe erfolgen nach individueller Vereinbarung.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary-900 to-primary-950 ring-1 ring-white/10 text-center space-y-4">
                                <h3 className="text-2xl font-display font-semibold text-white">Bereit für den Transport?</h3>
                                <p className="text-white/70">
                                    Prüfen Sie jetzt die Verfügbarkeit unseres Transporters.
                                </p>
                                <Button size="lg" className="h-12 px-8 text-lg" asChild>
                                    <Link href="/buchen">
                                        Jetzt Buchen <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Map Side */}
                        <div className="h-full min-h-[500px] w-full rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5 relative group">
                            {/* Google Maps Embed */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2524.36423456789!2d7.1633!3d51.2333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8d60c40123456%3A0x123456789abcdef!2sDorner%20Weg%2037%2C%2042349%20Wuppertal!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(0.85) contrast(1.2) invert(0.9)' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                title="Standort Google Maps"
                            ></iframe>

                            {/* Map overlay hint */}
                            <div className="absolute top-4 right-4 bg-primary-950/80 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-mono text-white/60 pointer-events-none border border-white/10">
                                Interactive Map
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
