import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getSiteUrl } from "@/lib/supabase/config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kayke — construindo minha trajetória em dados",
    template: "%s · Kayke",
  },
  description:
    "Portfólio de Kayke: estudante de Análise de Dados, Python e fundamentos da programação. Jornada, cursos, projetos e evolução documentados de verdade.",
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
    title: "Kayke — construindo minha trajetória em dados",
    description:
      "Estudante de Análise de Dados. Jornada, cursos, projetos e evolução documentados de verdade.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kayke — construindo minha trajetória em dados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kayke — construindo minha trajetória em dados",
    description:
      "Estudante de Análise de Dados. Jornada, cursos, projetos e evolução documentados de verdade.",
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
  themeColor: "#07090D",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&family=Sora:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
