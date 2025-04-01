import LegalLayout from "../../components/legal-layout";
import { type ReactNode } from "react";

export const metadata = {
  title: "Privacy Policy | GameShield",
  description: "Privacy Policy for GameShield - Generative Game CAPTCHA",
};

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return <LegalLayout>{children}</LegalLayout>;
}
