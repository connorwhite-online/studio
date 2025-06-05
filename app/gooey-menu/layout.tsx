import { ThemeProvider } from 'next-themes'
import type { Metadata } from "next";
import "../globals.css";
import '@radix-ui/themes/styles.css';

export const metadata: Metadata = {
  title: "Gooey Menu - Connor White",
  description: "Gooey menu component with smooth animations and interactions.",
};

export default function GooeyMenuLayout({
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
} 