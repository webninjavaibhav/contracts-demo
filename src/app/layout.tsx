import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ContextWrapper from "@/components/ContextWrapper";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

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
      <body className={roboto.className}>
        <ContextWrapper>{children}</ContextWrapper>
      </body>
    </html>
  );
}
