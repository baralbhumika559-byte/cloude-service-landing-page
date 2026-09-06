import type { Metadata } from "next";
import Header from "@/components/Header";
import PixelPageView from "@/components/PixelPageView";

export const metadata: Metadata = {
  title: "You're All Set! | Bhumika Digital",
  description: "Your free AI marketing consultation request has been received.",
  robots: { index: false, follow: false },
};

const videoPoints = [
  "What to expect from your consultation",
  "How we identify gaps in your current marketing",
  "Where AI can help your business",
  "What you should focus on next",
];

const nextSteps = [
  "Watch the video",
  "Book your consultation call",
  "Come prepared to discuss your business and marketing",
];

const WHATSAPP_NUMBER = "9779818719201";
// YouTube Shorts video: https://youtube.com/shorts/gBt58sbKKuc
const YOUTUBE_VIDEO_ID = "gBt58sbKKuc";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen pb-20">
      <PixelPageView />
      <Header />

      <section className="py-4 sm:py-8">
        <div className="container-narrow px-5 sm:px-6 text-center">
          <span
            className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-secondary-soft"
            aria-hidden="true"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6 9 17l-5-5"
                stroke="#16B364"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <h1 className="mt-5 font-display font-extrabold tracking-tight text-brand-ink text-3xl sm:text-4xl">
            You&rsquo;re All Set!
          </h1>
          <p className="mt-3 text-brand-ink-soft text-base sm:text-lg">
            Your request for a Free AI Marketing Consultation has been received.
          </p>
        </div>
      </section>

      {/* Video section */}
      <section className="py-10 sm:py-12">
        <div className="container-narrow px-5 sm:px-6">
          <div className="rounded-xl2 border border-brand-line bg-brand-bg-raised px-6 py-8 sm:px-10 sm:py-10 shadow-premium text-center">
            <p className="text-sm sm:text-base text-brand-ink-soft">
              Before your consultation, take a few minutes to watch the video
              below.
            </p>
            <h2 className="mt-2 font-display font-bold text-brand-ink text-xl sm:text-2xl">
              Watch This Before Your Call
            </h2>

            <div className="mt-6 mx-auto w-full max-w-[280px] aspect-[9/16] overflow-hidden rounded-xl border border-brand-line bg-black shadow-card">
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
                title="Watch this before your call"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <p className="mt-6 text-left text-sm font-semibold text-brand-ink">
              In this short video, you&rsquo;ll learn:
            </p>
            <ul className="mt-3 space-y-2 text-left">
              {videoPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-[15px] text-brand-ink-soft"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brand-primary"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-brand-ink-soft">
              Watch the video before your consultation so you can get more
              value from our conversation.
            </p>
          </div>
        </div>
      </section>

      {/* WhatsApp section */}
      <section className="py-2 sm:py-4">
        <div className="container-narrow px-5 sm:px-6">
          <div className="rounded-xl2 border border-brand-line bg-brand-bg-raised px-6 py-8 sm:px-10 sm:py-10 shadow-card text-center">
            <h2 className="font-display font-bold text-brand-ink text-xl sm:text-2xl">
              Want to Talk to Me Directly?
            </h2>
            <p className="mt-3 text-[15px] sm:text-base text-brand-ink-soft">
              Have a question before the call? You can message me directly on
              WhatsApp.
            </p>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-7 py-3.5 text-[15px] font-semibold text-white shadow-premium transition-transform duration-150 hover:-translate-y-0.5 hover:bg-brand-primary-dark active:translate-y-0"
            >
              <span aria-hidden="true">💬</span> WhatsApp Me
            </a>

            <p className="mt-5 text-sm text-brand-ink-soft">
              I&rsquo;ll be happy to hear about your business and what you&rsquo;re
              currently struggling with.
            </p>
          </div>
        </div>
      </section>

      {/* Next steps */}
      <section className="py-10 sm:py-12">
        <div className="container-narrow px-5 sm:px-6 text-center">
          <h2 className="font-display font-bold text-brand-ink text-xl sm:text-2xl">
            Your Next Step
          </h2>

          <ol className="mt-6 space-y-3 text-left">
            {nextSteps.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-4 rounded-2xl border border-brand-line bg-brand-bg-raised px-5 py-4 shadow-card"
              >
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-primary-soft font-display text-sm font-bold text-brand-primary">
                  {i + 1}
                </span>
                <span className="text-[15px] sm:text-base text-brand-ink">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-8 font-display font-semibold text-brand-ink text-lg">
            See you on the call!
          </p>
        </div>
      </section>
    </main>
  );
}
