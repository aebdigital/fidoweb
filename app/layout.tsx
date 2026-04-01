import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { CookieConsent } from "@/components/cookie-consent";
import { SITE_URL } from "@/lib/site-config";
import "./globals.css";

const sfDisplay = localFont({
  src: [
    { path: "../public/assets/fonts/SF-Display-Semibold.ttf", weight: "600", style: "normal" },
    { path: "../public/assets/fonts/SF-Display-Heavy.ttf", weight: "800", style: "normal" },
    { path: "../public/assets/fonts/SF-Display-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

const sfText = localFont({
  src: [
    { path: "../public/assets/fonts/SF-Text-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/assets/fonts/SF-Text-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/assets/fonts/SF-Text-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const defaultTitle = "FIDO Calcul";
const defaultDescription =
  "FIDO Calcul spája projekty, cenníky, klientov, Denník a fakturáciu do jednej appky pre stavebné firmy, dodávateľov a rozpočtárov.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.webmanifest",
  title: {
    default: defaultTitle,
    template: `%s | ${defaultTitle}`,
  },
  description: defaultDescription,
  applicationName: defaultTitle,
  keywords: [
    "FIDO Calcul",
    "stavebný softvér",
    "cenové ponuky",
    "fakturácia",
    "stavebníctvo",
    "dochádzka",
    "rozpočty",
    "projektový manažment",
    "dodávateľ",
    "Denník",
  ],
  authors: [{ name: "Fido s.r.o." }],
  creator: "Fido s.r.o.",
  publisher: "Fido s.r.o.",
  category: "business",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: SITE_URL,
    siteName: defaultTitle,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/assets/app-icon.jpg",
        width: 512,
        height: 512,
        alt: "FIDO Calcul",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/assets/app-icon.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  referrer: "origin-when-cross-origin",
  appleWebApp: {
    capable: true,
    title: defaultTitle,
    statusBarStyle: "default",
  },
  icons: {
    icon: "/assets/favicon.png",
    shortcut: "/assets/favicon.png",
    apple: "/assets/favicon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Fido s.r.o.",
        url: SITE_URL,
        logo: `${SITE_URL}/assets/app-icon.jpg`,
        email: "kontakt@fido.sk",
        telephone: "+421917617202",
      },
      {
        "@type": "WebSite",
        name: defaultTitle,
        url: SITE_URL,
        description: defaultDescription,
        inLanguage: "sk-SK",
      },
      {
        "@type": "SoftwareApplication",
        name: defaultTitle,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS",
        description: defaultDescription,
        url: SITE_URL,
        image: `${SITE_URL}/assets/app-icon.jpg`,
        publisher: {
          "@type": "Organization",
          name: "Fido s.r.o.",
        },
      },
    ],
  };

  return (
    <html lang="sk" className={`${sfDisplay.variable} ${sfText.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
