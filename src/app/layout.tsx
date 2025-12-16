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
  title: "Pferdetransporter-Vermietung Gelpe",
  description: "Flexibel mieten – 1 bis 7 Tage, inkl. Rückfahrkamera & Klimaanlage",
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
