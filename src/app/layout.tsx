import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../styles.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "God's Energy International Ventures Limited — Energy, Telecom & Global Trade",
  description: "God's Energy International Ventures Limited — A Nigerian multi-sector industrial partner specializing in upstream energy support, telecom infrastructure, global logistics, and general merchandise.",
  openGraph: {
    title: "God's Energy International Ventures Limited — Energy, Telecom & Global Trade",
    description: "Bridging global technology and local industrial need. Certified CAC registered.",
    url: "https://primerigventures.com",
    siteName: "God's Energy International Ventures",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "God's Energy International Ventures Limited — Energy, Telecom & Global Trade",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "God's Energy International Ventures Limited — Energy, Telecom & Global Trade",
    description: "God's Energy International Ventures Limited — A Nigerian multi-sector industrial partner specializing in upstream energy support, telecom infrastructure, global logistics, and general merchandise.",
    images: ["/og-image.jpg"],
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
