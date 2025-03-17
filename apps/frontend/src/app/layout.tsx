import Link from "next/link";
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
      <body className="antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="flex w-full items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-xl font-semibold transition-all hover:scale-95"
            >
              🎮 Gameshield 🛡️
            </Link>

            <div className="flex items-center gap-6">
              <Link
                href="/docs"
                className="text-gray-700 decoration-dotted transition-all hover:text-gray-900 hover:underline"
              >
                Docs
              </Link>
              <Link
                href="/signin"
                className="bg-blue-600 px-4 py-2 text-white transition-all hover:scale-95 hover:bg-blue-700"
              >
                Sign In
              </Link>
            </div>
          </header>

          <main className="flex flex-1 items-center justify-center p-4">
            {children}
          </main>

          <footer className="w-full px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center justify-between">
              <div>
                &copy; {new Date().getFullYear()} Fastrepl Inc. All rights
                reserved.
              </div>
              <div className="flex gap-6">
                <Link
                  href="/terms"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Terms
                </Link>
                <Link
                  href="/privacy"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Privacy
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
