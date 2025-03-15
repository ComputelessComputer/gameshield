import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GameShield - Secure CAPTCHA Alternative",
  description: "GameShield provides a fun and secure CAPTCHA alternative using interactive mini-games to verify human users.",
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
