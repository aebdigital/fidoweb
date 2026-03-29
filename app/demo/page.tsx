import type { Metadata } from "next";
import { DemoPage } from "@/components/demo-page";

export const metadata: Metadata = {
  title: "Demo",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-image-preview": "none",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function Page() {
  return <DemoPage />;
}
