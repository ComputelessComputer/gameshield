import { permanentRedirect } from "next/navigation";

export default function PermanentRedirect() {
  return permanentRedirect("https://docs.gameshield.dev");
}
