import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aliice - Medical ERP + CRM | Healthcare Management Platform",
  description:
    "Aliice combines the production strength of ERPs with the marketing power of CRMs. Manage your healthcare practice with appointments, patient records, invoicing, workflows, and marketing automation.",
  keywords:
    "medical ERP, healthcare CRM, clinic management, patient management, appointment scheduling, medical billing, healthcare automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
