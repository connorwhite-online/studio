import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from 'next-themes'
import type { Metadata, Viewport } from "next";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import BlurEntryAnimation from './components/BlurEntryAnimation';

export const metadata: Metadata = {
  title: {
    default: "Connor White — Software Designer & Engineer",
    template: "%s | Connor White",
  },
  description: "Work from the personal studio of software designer and engineer, Connor White.",
  keywords: ["Connor White", "Software Designer", "Software Engineer", "Portfolio", "Web Development", "UI/UX Design"],
  authors: [{ name: "Connor White" }],
  creator: "Connor White",
  metadataBase: new URL('https://connorwhite.studio'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Connor White — Software Designer & Engineer",
    description: "Work from the personal studio of software designer and engineer, Connor White.",
    siteName: "Connor White",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Connor White — Software Designer & Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Connor White — Software Designer & Engineer",
    description: "Work from the personal studio of software designer and engineer, Connor White.",
    creator: "@connor_online",
    images: ["/og-image.png"],
  },
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem={true}
          value={{
            light: "light",
            dark: "dark"
          }}
        >
          {children}
          <BlurEntryAnimation />
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-250C59M66F" />
    </html>
  );
}