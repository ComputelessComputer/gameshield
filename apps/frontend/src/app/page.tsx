import GameShieldDemo from "./components/GameShieldDemo";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full flex flex-col items-center gap-4 pt-8">
        <h1 className="text-4xl font-bold">GameShield</h1>
        <p className="text-lg text-center max-w-2xl">
          A game-based CAPTCHA system that provides a fun and secure way to
          verify human users
        </p>
      </header>

      <main className="flex flex-col gap-[32px] row-start-2 items-center w-full">
        <GameShieldDemo />

        <div className="mt-12 max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">About GameShield</h2>
          <p className="mb-4">
            GameShield is a modern CAPTCHA alternative that uses interactive
            games to verify human users. Unlike traditional CAPTCHAs that can be
            frustrating and difficult, GameShield provides an engaging
            experience while maintaining strong security.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-4 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Secure</h3>
              <p>
                Advanced behavior analysis to detect bots while allowing humans
                to pass easily
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Engaging</h3>
              <p>
                Fun mini-games that users actually enjoy completing instead of
                dreading
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Accessible</h3>
              <p>
                Multiple game types and difficulty levels to accommodate
                different users
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center mt-12">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/ComputelessComputer/gameshield"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          GitHub
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          Documentation
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/examples"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="8" y1="12" x2="16" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="16"></line>
          </svg>
          Examples
        </a>
      </footer>
    </div>
  );
}
