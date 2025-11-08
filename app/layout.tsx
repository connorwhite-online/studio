import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from 'next-themes'
import type { Metadata } from "next";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import BlurEntryAnimation from './components/BlurEntryAnimation';

export const metadata: Metadata = {
  title: "Connor White",
  description: "Work from the personal studio of software designer and engineer, Connor White.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
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