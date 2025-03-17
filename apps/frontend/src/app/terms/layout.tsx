import LegalLayout from "../components/legal-layout";
import { type ReactNode } from "react";

export const metadata = {
  title: "Terms of Service | GameShield",
  description: "Terms of Service for GameShield - Generative Game CAPTCHA",
};

export default function TermsLayout({ children }: { children: ReactNode }) {
  return <LegalLayout>{children}</LegalLayout>;
}
