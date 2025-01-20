import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from 'next-themes'
import type { Metadata } from "next";
import Menu from "./components/menu";
import "./globals.css";

export const metadata: Metadata = {
  title: "Connor White",
  description: "Work from the personal studio of designer and engineer, Connor White.",
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
            dark: "dark",
            system: "system"
          }}
        >
          <Menu />
          {children}
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-250C59M66F" />
    </html>
  );
}