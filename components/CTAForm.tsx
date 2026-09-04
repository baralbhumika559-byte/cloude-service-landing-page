import FlodeskForm from "./FlodeskForm";

// This section keeps its original card, heading, and badges — only the
// form itself was swapped from the custom-built one to the live Flodesk
// embed (see FlodeskForm.tsx) so submissions actually land in Flodesk and
// trigger its automation.
export default function CTAForm() {
  return (
    <section id="book" className="py-14 sm:py-20">
      <div className="container-narrow px-5 sm:px-6">
        <div className="rounded-xl2 border border-brand-line bg-brand-bg-raised px-6 py-8 sm:px-10 sm:py-10 shadow-premium text-center">
          <h2 className="font-display font-bold text-brand-ink text-2xl sm:text-3xl">
            Book the Call
          </h2>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-full border border-brand-line bg-brand-bg px-3.5 py-1.5 text-xs font-semibold text-brand-ink-soft">
              One-to-one consultation
            </span>
            <span className="rounded-full border border-brand-line bg-brand-bg px-3.5 py-1.5 text-xs font-semibold text-brand-ink-soft">
              Customized strategy for your business
            </span>
          </div>

          <div className="mt-8 text-left">
            <FlodeskForm />
          </div>

          <p className="mt-4 text-center text-xs text-brand-ink-faint">
            We respect your privacy. No spam.
          </p>
        </div>
      </div>
    </section>
  );
}
