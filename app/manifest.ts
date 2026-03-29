import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FIDO Calcul",
    short_name: "FIDO Calcul",
    description:
      "FIDO Calcul spája projekty, cenníky, klientov, Denník a fakturáciu do jednej appky pre stavebné firmy, dodávateľov a rozpočtárov.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f3ee",
    theme_color: "#f5f3ee",
    lang: "sk",
    icons: [
      {
        src: "/assets/app-icon.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
      {
        src: "/assets/app-icon.jpg",
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "maskable",
      },
    ],
  };
}
