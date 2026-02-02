import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plombier Orléans - Dépannage & Entretien | Artisan RGE",
  description: "Votre plombier chauffagiste de confiance à Orléans et ses environs. Dépannage rapide 7j/7, entretien chaudière, rénovation salle de bain. Certifié RGE.",
  keywords: "plombier orléans, chauffagiste orléans, dépannage plomberie, entretien chaudière, rénovation salle de bain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${manrope.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
