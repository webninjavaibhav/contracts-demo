import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ weight: "300", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Contract Summary App",
  description: "Summary of selected contracts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
