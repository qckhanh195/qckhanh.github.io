export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-orange-100 bg-orange-50/60 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={scrollTop}
          className="font-display text-lg font-bold flex items-center gap-0.5"
        >
          <span className="text-orange-500">&lt;</span>
          <span className="text-gradient">Qika</span>
          <span className="text-orange-500">/&gt;</span>
        </button>
        <p className="text-sm text-stone-500 text-center">
          © 2026 Quoc Khanh. Crafted with <span className="text-orange-500">❤️</span> and lots of coffee.
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/qckhanh195"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-orange-500 transition-colors text-xl"
            aria-label="GitHub"
          >
            🐙
          </a>
          <a
            href="mailto:qckhanh195@gmail.com"
            className="text-stone-400 hover:text-orange-500 transition-colors text-xl"
            aria-label="Email"
          >
            ✉️
          </a>
        </div>
      </div>
    </footer>
  );
}
