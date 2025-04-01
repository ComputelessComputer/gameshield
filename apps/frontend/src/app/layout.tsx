import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gameshield - Generative Game CAPTCHA",
  description:
    "Protect your website from bots with interactive, fun game challenges",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
