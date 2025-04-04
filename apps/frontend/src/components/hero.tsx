export default function Hero() {
  return (
    <div className="flex w-full max-w-2xl flex-col items-start gap-4">
      <h1 className="text-5xl font-bold">🎮 Gameshield 🛡️</h1>
      <p className="text-lg">Game-as-a-CAPTCHA</p>
      <div className="flex items-center gap-4">
        <button className="bg-blue-600 px-4 py-2 text-white transition-all hover:scale-95 hover:bg-blue-700">
          Get Started
        </button>

        <a
          href="https://github.com/gameshield/gameshield"
          className="inline-flex cursor-pointer items-center gap-2 text-gray-500"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
