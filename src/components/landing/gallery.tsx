"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const images = [
    {
        src: "/images/Mieten – Roelofsen/Außen.jpeg",
        alt: "Pferdetransporter Außenansicht",
        label: "Außenansicht",
    },
    {
        src: "/images/Mieten – Roelofsen/Fahrerkabine.jpg",
        alt: "Fahrerkabine Interieur",
        label: "Fahrerkabine",
    },
    {
        src: "/images/Mieten – Roelofsen/Pferdebox.jpg",
        alt: "Pferdebox Innenraum",
        label: "Pferdebereich",
    },
    {
        src: "/images/Mieten – Roelofsen/Rückfahrkamera.jpeg",
        alt: "Rückfahrkamera Display",
        label: "Kamerasystem",
    },
    {
        src: "/images/Mieten – Roelofsen/Stauraum.jpg",
        alt: "Sattelkammer Stauraum",
        label: "Sattelkammer",
    },
];

export function Gallery() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <Section variant="transparent" className="py-12 w-full px-4 md:px-0">
            <div className="text-center mb-10">
                <h2 className="font-display text-3xl md:text-5xl text-white mb-6">
                    Einblicke
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                    Machen Sie sich selbst ein Bild von unserem top-gepflegten Transporter.
                </p>
            </div>

            <div className="relative w-[98%] max-w-[1920px] mx-auto">
                {/* Main Slide */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-2xl">
                    <Image
                        src={images[currentIndex].src}
                        alt={images[currentIndex].alt}
                        fill
                        className="object-cover transition-all duration-500"
                        priority
                    />

                    {/* Overlay with Label */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-10 flex items-end">
                        <span className="text-white font-display text-2xl md:text-3xl border-l-4 border-accent pl-4">
                            {images[currentIndex].label}
                        </span>
                    </div>

                    {/* Navigation Arrows (Desktop) */}
                    <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prevSlide}
                            className="bg-black/20 hover:bg-black/40 text-white border-white/20 backdrop-blur-sm pointer-events-auto h-12 w-12 rounded-full hidden md:flex"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={nextSlide}
                            className="bg-black/20 hover:bg-black/40 text-white border-white/20 backdrop-blur-sm pointer-events-auto h-12 w-12 rounded-full hidden md:flex"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </Button>
                    </div>
                </div>

                {/* Navigation Arrows (Mobile) & Dots */}
                <div className="mt-8 flex flex-col items-center gap-6">
                    <div className="flex md:hidden gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prevSlide}
                            className="bg-white/10 text-white border-white/20 h-12 w-12 rounded-full"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={nextSlide}
                            className="bg-white/10 text-white border-white/20 h-12 w-12 rounded-full"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </Button>
                    </div>

                    {/* Thumbnails/Indicators */}
                    <div className="flex gap-2 justify-center flex-wrap px-4">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-2 transition-all duration-300 rounded-full ${idx === currentIndex ? "w-8 bg-accent" : "w-2 bg-white/20 hover:bg-white/40"
                                    }`}
                                aria-label={`Gehe zu Bild ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
