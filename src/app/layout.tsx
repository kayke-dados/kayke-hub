import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getSiteUrl } from "@/lib/supabase/config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kayke — aprendendo a ler dados",
    template: "%s · Kayke",
  },
  description:
    "Portfólio de Kayke, estudante de Análise de Dados. O registro real do que estou aprendendo em Python, lógica e, em breve, SQL.",
  applicationName: "Kayke Space",
  authors: [{ name: "Kayke", url: "https://github.com/kayke-dados" }],
  creator: "Kayke",
  keywords: [
    "Kayke",
    "portfólio",
    "análise de dados",
    "Python",
    "SQL",
    "Power BI",
    "estudante",
    "dados",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Kayke Space",
    title: "Kayke — aprendendo a ler dados",
    description:
      "Estudante de Análise de Dados. O registro real do que estou aprendendo em Python, lógica e SQL.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kayke — aprendendo a ler dados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kayke — aprendendo a ler dados",
    description:
      "Estudante de Análise de Dados. O registro real do que estou aprendendo em Python, lógica e SQL.",
    images: ["/assets/og-image.png"],
  },
  icons: {
    icon: [{ url: "/assets/favicon.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..600&family=Instrument+Sans:wght@400;500;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
