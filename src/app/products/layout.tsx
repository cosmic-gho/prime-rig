import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — God's Energy International Ventures",
  description: "Browse our full product catalog with search and category filters.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
