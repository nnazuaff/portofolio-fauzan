import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Fauzan Zhahir Arrafi | Full Stack Web Developer",
    template: "%s | Fauzan Zhahir Arrafi",
  },
  description:
    "Portfolio Fauzan Zhahir Arrafi, Full Stack Web Developer berbasis Laravel, Livewire, Tailwind CSS, dan MySQL.",
  keywords: [
    "Fauzan Zhahir Arrafi",
    "Full Stack Web Developer",
    "Laravel Developer",
    "Junior Web Developer Bandung",
  ],
  authors: [{ name: "Fauzan Zhahir Arrafi" }],
  openGraph: {
    title: "Fauzan Zhahir Arrafi | Full Stack Web Developer",
    description:
      "Membangun aplikasi web terstruktur dari database sampai deployment.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fauzan Zhahir Arrafi | Full Stack Web Developer",
    description:
      "Membangun aplikasi web terstruktur dari database sampai deployment.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
