import type { Metadata } from "next";
import { Amaranth, Nunito_Sans, Poppins } from "next/font/google";
import "./globals.css";

// Amaranth: solo para el nombre KARU
const amaranth = Amaranth({
  variable: "--font-amaranth",
  subsets: ["latin"],
  weight: "700",
});

// Poppins: títulos, botones y elementos de identidad
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// Nunito Sans: textos e interfaz (es una fuente variable: trae todos los pesos)
const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KARU · Descubrí dónde comer rico",
  description: "Descubrí y compartí reseñas de rotiserías y locales de comida de Corrientes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${amaranth.variable} ${poppins.variable} ${nunitoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-crema font-sans text-carbon">{children}</body>
    </html>
  );
}