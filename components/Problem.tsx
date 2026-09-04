const problems = [
  "You're spending time and money on marketing and can't tell if it's actually working.",
  "Leads come in some months, then dry up the next — it's hard to plan around.",
  "You've tried a few things yourself, or hired someone, and it still didn't fix it.",
  "You don't have the time to learn marketing on top of running your business.",
];

export default function Problem() {
  return (
    <section className="py-14 sm:py-20">
      <div className="container-narrow px-5 sm:px-6 text-center">
        <h2 className="font-display font-bold text-brand-ink text-2xl sm:text-3xl">
          Sound familiar?
        </h2>

        <ul className="mt-8 space-y-3 text-left">
          {problems.map((line) => (
            <li
              key={line}
              className="flex items-start gap-3 rounded-2xl border border-brand-line bg-brand-bg-raised px-5 py-4 text-[15px] sm:text-base text-brand-ink shadow-card"
            >
              <span
                className="mt-1 h-2 w-2 flex-none rounded-full bg-brand-primary"
                aria-hidden="true"
              />
              {line}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-brand-ink-soft text-[15px] sm:text-base">
          On your free consultation, we&rsquo;ll show you exactly where this is
          happening in your business — and what an AI-powered marketing plan
          would do differently.
        </p>
      </div>
    </section>
  );
}
