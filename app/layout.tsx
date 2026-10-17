import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const jakarta = localFont({
  src: "../public/fonts/plus-jakarta-sans-latin.woff2",
  variable: "--font-jakarta",
  display: "swap",
  weight: "200 800",
});

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
    images: ["/og-image.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fauzan Zhahir Arrafi | Full Stack Web Developer",
    description:
      "Membangun aplikasi web terstruktur dari database sampai deployment.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
