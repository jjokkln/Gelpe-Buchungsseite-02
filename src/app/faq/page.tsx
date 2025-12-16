import { Section } from "@/components/ui/section";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const metadata = {
    title: "Häufige Fragen (FAQ) | Pferdetransporter Gelpe",
};

const faqs = [
    {
        question: "Welchen Führerschein benötige ich?",
        answer: "Für unseren Transporter benötigen Sie in den meisten Fällen einen Führerschein der Klasse B (PKW), sofern das zulässige Gesamtgewicht von 3,5t nicht überschritten wird. Bitte prüfen Sie dies jedoch individuell.",
    },
    {
        question: "Wie hoch ist die Kaution?",
        answer: "Die Kaution beträgt 500 € und muss vor Antritt der Fahrt hinterlegt werden. Dies kann in Bar oder per Kreditkarten-Reservierung erfolgen.",
    },
    {
        question: "Muss ich den Transporter reinigen?",
        answer: "Der Transporter wird sauber übergeben und sollte besenrein zurückgegeben werden. Bei starker Verschmutzung oder wenn Sie keine Zeit haben, bieten wir eine Endreinigung für 45 € an.",
    },
    {
        question: "Was passiert bei einer Stornierung?",
        answer: "Sie können Ihre Buchung bis zu 48 Stunden vor Mietbeginn stornieren. Es fällt jedoch eine pauschale Bearbeitungsgebühr von 25 € an.",
    },
    {
        question: "Ist der Transporter versichert?",
        answer: "Ja, der Transporter ist vollkaskoversichert mit einer Selbstbeteiligung. Details finden Sie im Mietvertrag.",
    },
    {
        question: "Darf ich ins Ausland fahren?",
        answer: "Fahrten ins EU-Ausland sind grundsätzlich erlaubt, müssen aber vorher angemeldet werden.",
    },
];

export default function FAQPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
            <Section variant="transparent" className="space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="font-display text-4xl md:text-5xl text-white">Häufige Fragen</h1>
                    <p className="text-white/70 text-lg">Alles was Sie zur Anmietung wissen müssen.</p>
                </div>

                {/* Search Bar - Visual Only for now */}
                <div className="relative max-w-xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                    <Input
                        placeholder="Nach Themen suchen..."
                        className="pl-12 h-14 bg-white/5 ring-white/20 focus:ring-accent/50 text-lg"
                    />
                </div>

                <div className="bg-white/5 rounded-2xl ring-1 ring-white/10 p-2 md:p-8">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </Section>
        </div>
    );
}
