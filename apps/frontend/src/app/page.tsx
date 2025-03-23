import Hero from "@/components/hero";
import GameshieldDemo from "@/components/gameshield-demo";

export default function Home() {
  return (
    <div className="flex w-full max-w-6xl items-center gap-4">
      <Hero />
      <GameshieldDemo />
    </div>
  );
}
