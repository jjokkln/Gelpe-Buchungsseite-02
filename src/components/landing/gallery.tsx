import { Section } from "@/components/ui/section";
import Image from "next/image";

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
    return (
        <Section variant="transparent" className="py-20 container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-5xl text-white mb-6">
                    Einblicke
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                    Machen Sie sich selbst ein Bild von unserem top-gepflegten Transporter.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`
              relative group overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 aspect-[4/3]
            `}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <span className="text-white font-medium text-lg border-l-4 border-accent pl-3">
                                {img.label}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
