import { type ReactNode } from "react";

export const metadata = {
  title: "Terms of Service | GameShield",
  description: "Terms of Service for GameShield - Generative Game CAPTCHA",
};

export default function TermsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">
      {children}
    </main>
  );
}
