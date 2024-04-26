import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ContextWrapper from "@/components/ContextWrapper";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
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
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js"></script>
      </head>
      <body className={roboto.className}>
        <ContextWrapper>{children}</ContextWrapper>
      </body>
    </html>
  );
}
