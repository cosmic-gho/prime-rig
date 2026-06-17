import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & RFQ — Prime Rig Ventures Limited",
  description: "Submit an official RFQ. Direct lines to upstream energy, telecom infrastructure, and global logistics support desks.",
  openGraph: {
    title: "Contact — Prime Rig Ventures",
    description: "Smart RFQ intake — describe your project, attach documents, get routed to the right division.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
