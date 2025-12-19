import type { Metadata } from "next";
import { Inter, Antic_Didone } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anticDidone = Antic_Didone({
  variable: "--font-antic-didone",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://pferdetransporter-gelpe.de"),
  title: {
    default: "Pferdetransporter-Vermietung Gelpe | Flexibel & Sicher",
    template: "%s | Pferdetransporter Gelpe"
  },
  description: "Mieten Sie unseren Premium-Pferdetransporter in Wuppertal. 2-Pferde Kapazität, Videoüberwachung, Klimaanlage und flexiblen Tarifen ab 88€.",
  keywords: ["Pferdetransporter mieten", "Pferdeanhänger", "Wuppertal", "Gelpe", "Pferdetransport", "Reitsport", "Transporter Vermietung"],
  authors: [{ name: "Bergische Reitsport-Akademie Gelpe" }],
  creator: "Bergische Reitsport-Akademie Gelpe",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    title: "Pferdetransporter-Vermietung Gelpe | Flexibel & Sicher",
    description: "Mieten Sie unseren Premium-Pferdetransporter in Wuppertal. 2-Pferde Kapazität, Videoüberwachung, Klimaanlage.",
    siteName: "Pferdetransporter-Vermietung Gelpe",
    images: [
      {
        url: "/images/transporter_dunkel.jpeg",
        width: 1200,
        height: 630,
        alt: "Pferdetransporter Außenansicht",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pferdetransporter-Vermietung Gelpe",
    description: "Premium Pferdetransporter in Wuppertal mieten.",
    images: ["/images/transporter_dunkel.jpeg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// ... existing code ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${inter.variable} ${anticDidone.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
