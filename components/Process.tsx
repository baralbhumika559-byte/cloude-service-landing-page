const steps = [
  {
    title: "Book your call",
    body: "Fill out the short form below to schedule your free consultation.",
  },
  {
    title: "Get your marketing snapshot",
    body: "We look at your business and show you where you're losing customers.",
  },
  {
    title: "Get your custom plan",
    body: "Walk away with a clear, personalized AI marketing plan for your business.",
  },
];

export default function Process() {
  return (
    <section className="py-14 sm:py-20">
      <div className="container-narrow px-5 sm:px-6 text-center">
        <h2 className="font-display font-bold text-brand-ink text-2xl sm:text-3xl">
          Consultation Process
        </h2>

        <div className="mt-8 space-y-3 text-left">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="flex items-start gap-4 rounded-2xl border border-brand-line bg-brand-bg-raised px-5 py-5 shadow-card"
            >
              <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand-primary-soft font-display text-sm font-bold text-brand-primary">
                {i + 1}
              </div>
              <div>
                <h3 className="font-display font-semibold text-brand-ink text-[15px] sm:text-base">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm sm:text-[15px] text-brand-ink-soft">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
