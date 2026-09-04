const benefits = [
  "Find out exactly where your marketing is losing you customers",
  "Get a plan built for your business, not generic advice",
  "See what AI-powered marketing could look like for your business",
  "Stop wasting time and money on marketing that isn't working",
  "Leave with clear next steps for your marketing",
];

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="flex-none"
    >
      <circle cx="12" cy="12" r="12" fill="#E7ECFC" />
      <path
        d="M8 12.5 10.8 15.3 16 9.5"
        stroke="#2954E0"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Benefits() {
  return (
    <section className="py-14 sm:py-20 bg-white/60">
      <div className="container-narrow px-5 sm:px-6 text-center">
        <h2 className="font-display font-bold text-brand-ink text-2xl sm:text-3xl">
          How You Benefit From This Consultation
        </h2>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 text-left">
          {benefits.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-brand-line bg-brand-bg-raised px-5 py-4 shadow-card sm:last:col-span-2"
            >
              <CheckIcon />
              <span className="text-[15px] sm:text-base text-brand-ink">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
