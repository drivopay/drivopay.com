import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DrivoPay - Get Paid Instantly | Payments Platform for Drivers",
  description: "The payments platform built for drivers. No platform fees. No waiting periods. Just instant money in your pocket. Join 50,000+ active drivers.",
  keywords: ["payments", "drivers", "instant payouts", "zero fees", "gig economy", "rideshare", "delivery"],
  authors: [{ name: "DrivoPay" }],
  openGraph: {
    title: "DrivoPay - Get Paid Instantly",
    description: "The payments platform built for drivers. No platform fees. No waiting periods.",
    type: "website",
    url: "https://drivopay.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "DrivoPay - Get Paid Instantly",
    description: "The payments platform built for drivers. No platform fees. No waiting periods.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
