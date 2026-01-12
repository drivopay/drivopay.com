import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://drivopay.com'),
  title: "DrivoPay - Get Paid Instantly | Payments Platform for Drivers",
  description: "The payments platform built for drivers. No platform fees. No waiting periods. Just instant money in your pocket. Join 50,000+ active drivers.",
  keywords: ["payments", "drivers", "instant payouts", "zero fees", "gig economy", "rideshare", "delivery", "uber", "ola", "rapido", "zomato", "swiggy", "dunzo", "driver payments", "instant cash"],
  authors: [{ name: "DrivoPay" }],
  creator: "DrivoPay",
  publisher: "DrivoPay",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "DrivoPay - Get Paid Instantly",
    description: "The payments platform built for drivers. No platform fees. No waiting periods.",
    type: "website",
    url: "https://drivopay.com",
    siteName: "DrivoPay",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DrivoPay - Get Paid Instantly",
    description: "The payments platform built for drivers. No platform fees. No waiting periods.",
    site: "@drivopay",
    creator: "@drivopay",
  },
  alternates: {
    canonical: "https://drivopay.com",
  },
  verification: {
    // Add your verification codes when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DrivoPay",
    "url": "https://drivopay.com",
    "logo": "https://drivopay.com/output-onlinepngtools.png",
    "description": "Instant payments platform for gig economy drivers. No fees, no waiting periods.",
    "foundingDate": "2026",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "support@drivopay.com"
    },
    "sameAs": [
      // Add social media links when available
      // "https://twitter.com/drivopay",
      // "https://facebook.com/drivopay",
      // "https://linkedin.com/company/drivopay"
    ]
  };

  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "DrivoPay Instant Payment Service",
    "description": "Instant payment platform for drivers with zero fees and instant payouts",
    "provider": {
      "@type": "Organization",
      "name": "DrivoPay"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
