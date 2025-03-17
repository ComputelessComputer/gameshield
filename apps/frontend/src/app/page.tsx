import GameshieldDemo from "./components/gameshield-demo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <header className="w-full py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎮</span>
          <h1 className="text-xl font-semibold">GameShield</h1>
          <span className="text-2xl">🛡️</span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/docs"
            className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Docs
          </Link>
          <Link
            href="/signin"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <GameshieldDemo />
      </main>

      <footer className="w-full py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex justify-between items-center">
          <div>
            &copy; {new Date().getFullYear()} Fastrepl Inc. All rights reserved.
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
  );
}
