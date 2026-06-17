import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — Prime Rig Ventures",
  description: "Browse our full product catalog with search and category filters.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
