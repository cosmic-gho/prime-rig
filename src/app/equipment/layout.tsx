import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipment Catalog — Prime Rig Ventures",
  description: "Interactive procurement portal: oilfield production tools, telecom hardware, industrial commodities and more. Request a quote with compliance-verified parts.",
  openGraph: {
    title: "Equipment Catalog — Prime Rig Ventures",
    description: "Browse and request quotes on certified industrial equipment across energy, telecom and commodities.",
  },
};

export default function EquipmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
