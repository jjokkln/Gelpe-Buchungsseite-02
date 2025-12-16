import Link from "next/link";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-primary-950 border-t border-white/10 text-white py-12 md:py-16">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* Brand & Address */}
                <div className="space-y-4">
                    <h3 className="font-display text-2xl font-bold tracking-wide">
                        Pferdetransporter<span className="text-accent">Gelpe</span>
                    </h3>
                    <div className="flex items-start gap-3 text-white/70 text-sm">
                        <MapPin className="h-5 w-5 shrink-0 mt-0.5 text-accent" />
                        <address className="not-italic leading-relaxed">
                            Bergische Reitsport-Akademie Gelpe <br />
                            Dorner Weg 37 <br />
                            42349 Wuppertal
                        </address>
                    </div>
                </div>

                {/* Contact */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-white">Kontakt</h4>
                    <ul className="space-y-3 text-sm text-white/70">
                        <li className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-accent" />
                            <span>+49 123 4567890</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-accent" />
                            <a href="mailto:info@pferdetransporter-gelpe.de" className="hover:text-white transition-colors">
                                info@pferdetransporter-gelpe.de
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Legal & Social */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-white">Rechtliches</h4>
                    <nav className="flex flex-col gap-2 text-sm text-white/70">
                        <Link href="/impressum" className="hover:text-accent transition-colors">Impressum</Link>
                        <Link href="/datenschutz" className="hover:text-accent transition-colors">Datenschutz</Link>
                        <Link href="/agb" className="hover:text-accent transition-colors">AGB & Mietbedingungen</Link>
                    </nav>

                    <div className="pt-4 flex items-center gap-4">
                        <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-accent transition-colors">
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-accent transition-colors">
                            <Facebook className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/5 text-center text-xs text-white/40">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <span>&copy; {new Date().getFullYear()} Pferdetransporter-Vermietung Gelpe. Alle Rechte vorbehalten.</span>
                    <Link href="/admin" className="hover:text-white transition-colors opacity-50 hover:opacity-100">Admin</Link>
                </div>
            </div>
        </footer>
    );
}
