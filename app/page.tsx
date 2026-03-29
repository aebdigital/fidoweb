import type { Metadata } from "next";
import { MarketingHomePage } from "@/components/marketing-home-page";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FIDO Calcul",
  description:
    "FIDO Calcul pomáha stavebným firmám, dodávateľom a rozpočtárom držať projekty, cenníky, klientov, Denník a fakturáciu v jednej appke.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FIDO Calcul",
    description:
      "FIDO Calcul pomáha stavebným firmám, dodávateľom a rozpočtárom držať projekty, cenníky, klientov, Denník a fakturáciu v jednej appke.",
    url: SITE_URL,
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
    title: "FIDO Calcul",
    description:
      "FIDO Calcul pomáha stavebným firmám, dodávateľom a rozpočtárom držať projekty, cenníky, klientov, Denník a fakturáciu v jednej appke.",
    images: ["/assets/app-icon.jpg"],
  },
};

export default function Page() {
  return <MarketingHomePage />;
}
