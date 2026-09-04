import type { Metadata } from "next";
import { Manrope, Public_Sans } from "next/font/google";
import "./globals.css";

const display = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = "https://www.bhumikadigital.com";
const title = "Free AI Marketing Consultation | Bhumika Digital";
const description =
  "Get a free, personalized AI marketing consultation for your business. See exactly what's not working in your marketing and what an AI-powered plan could do instead.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "AI marketing consultation",
    "digital marketing for small business",
    "AI marketing agency",
    "small business marketing help",
    "Bhumika Digital",
  ],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Bhumika Digital",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Bhumika Digital — Free AI Marketing Consultation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  // app/icon.png and app/apple-icon.png are picked up automatically by
  // Next.js — no manual `icons` entry needed.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body bg-brand-bg text-brand-ink antialiased">
        {children}
      </body>
    </html>
  );
}
