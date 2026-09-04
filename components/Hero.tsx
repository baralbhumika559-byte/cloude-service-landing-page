export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-6 pb-14 sm:pt-10 sm:pb-20">
      {/* Soft premium background: gentle radial glow + faint grid, both subtle */}
      <div
        className="pointer-events-none absolute inset-0 bg-hero-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-soft-grid bg-[length:32px_32px] opacity-40 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />

      <div className="container-narrow relative px-5 sm:px-6 text-center">
        <span className="inline-flex items-center rounded-full border border-brand-line bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-ink-soft shadow-sm backdrop-blur animate-fade-up">
          Free for small &amp; medium business owners
        </span>

        <h1
          className="mt-6 font-display font-extrabold tracking-tight text-brand-ink text-[2.1rem] leading-[1.15] sm:text-5xl sm:leading-[1.12] animate-fade-up"
          style={{ animationDelay: "80ms" }}
        >
          Stop Guessing Why Your Marketing{" "}
          <span className="text-brand-primary">Isn&rsquo;t Bringing In Customers</span>
        </h1>

        <p
          className="mx-auto mt-5 max-w-xl text-base sm:text-lg text-brand-ink-soft animate-fade-up"
          style={{ animationDelay: "140ms" }}
        >
          Get a free, personalized AI marketing consultation — see exactly what&rsquo;s not
          working and what to fix.
        </p>

        <p
          className="mx-auto mt-4 max-w-md text-sm sm:text-base text-brand-ink-soft animate-fade-up"
          style={{ animationDelay: "180ms" }}
        >
          This free call is for small business owners who are working hard but not
          getting enough customers from their marketing. We&rsquo;ll look at your business
          and show you where you&rsquo;re losing leads — and what an AI-powered marketing
          plan could do instead.
        </p>

        <div
          className="mt-8 flex justify-center animate-fade-up"
          style={{ animationDelay: "220ms" }}
        >
          <a
            href="#book"
            className="inline-flex items-center justify-center rounded-xl bg-brand-primary px-8 py-4 text-base font-semibold text-white shadow-premium transition-transform duration-150 hover:-translate-y-0.5 hover:bg-brand-primary-dark active:translate-y-0"
          >
            Book Free Consultation
          </a>
        </div>
        <p className="mt-3 text-xs text-brand-ink-faint">
          No cost. No obligation. Just a clear look at your marketing.
        </p>
      </div>
    </section>
  );
}
