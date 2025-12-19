import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                >
                    <source src="/videos/transporter_preview.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Overlay Layers */}
            {/* 1. Base Darkening */}
            <div className="absolute inset-0 bg-black/40 z-10" />
            {/* 2. Gradient from bottom (brand colors) */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary-950/60 via-primary-900/40 to-primary-950 z-10" />
            {/* 3. Gradient from top (shadow) */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none" />

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 text-center space-y-6 max-w-4xl">
                <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-sm">
                    Pferdetransporter-Vermietung <br className="hidden sm:block" />
                    <span className="text-accent">Gelpe</span>
                </h1>

                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
                    Flexibel mieten – 1 bis 7 Tage. <br />
                    Inklusive Rückfahrkamera, Klimaanlage & Vollausstattung.
                </p>

                <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-10 bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 shadow-lg font-semibold transition-all" asChild>
                        <Link href="/buchen">Jetzt buchen</Link>
                    </Button>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-14 px-10 text-white border-white/20 hover:bg-white/10 hover:text-white backdrop-blur-sm bg-black/20" asChild>
                        <Link href="#preise">Preise ansehen</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
