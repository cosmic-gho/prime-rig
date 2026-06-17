import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../styles.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Prime Rig Ventures Limited — Energy, Telecom & Global Trade",
  description: "Integrated infrastructure solutions across energy, telecommunications, and procurement. CAC-certified Nigerian private limited company.",
  openGraph: {
    title: "Prime Rig Ventures Limited — Energy, Telecom & Global Trade",
    description: "Integrated infrastructure solutions across energy, telecommunications, and procurement. CAC-certified Nigerian private limited company.",
    type: "website",
    images: ["https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d26a50fd-f417-42ce-88c1-d0a3edd89a2f/id-preview-745fa512--b0b0941e-856b-459d-9105-24d96915c308.lovable.app-1781543601613.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Rig Ventures Limited — Energy, Telecom & Global Trade",
    description: "Integrated infrastructure solutions across energy, telecommunications, and procurement. CAC-certified Nigerian private limited company.",
    images: ["https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d26a50fd-f417-42ce-88c1-d0a3edd89a2f/id-preview-745fa512--b0b0941e-856b-459d-9105-24d96915c308.lovable.app-1781543601613.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
