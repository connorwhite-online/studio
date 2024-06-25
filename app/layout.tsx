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
    <html lang="en" data-theme="dark">
      <body>
      <Menu />
      {children}
      </body>
    </html>
  );
}