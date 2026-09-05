# Bhumika Digital — Free AI Marketing Consultation Landing Page

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Mobile-first, single
goal: get the visitor to submit the consultation form.

## Before you deploy

Nothing left to fill in — the logo, WhatsApp number, and "watch this before
your call" video are all wired in:

- **Video** — embedded from YouTube (Shorts) via an `<iframe>` in
  `app/thank-you/page.tsx` (constant `YOUTUBE_VIDEO_ID`). It's framed as a
  portrait 9:16 player to match Shorts. To swap the video, replace just the
  video ID — e.g. for `https://youtube.com/shorts/gBt58sbKKuc` the ID is
  `gBt58sbKKuc`.
- **WhatsApp number** — `WHATSAPP_NUMBER` in the same file.

The form works out of the box (see below) — no other setup required.

## What the form does right now

The booking form is your live Flodesk embed (form id
`6a91b97715d1aba2900c08a4`), not a custom-built form — see
`components/FlodeskForm.tsx`. Leads are captured by Flodesk exactly as they
would be on any other Flodesk-embedded page, and Flodesk's own automation
for that form still fires on submit. Nothing about the embed's action URL,
field names, hidden fields, or loader scripts was changed.

One thing *was* changed, deliberately: inside the embed's own config block
(`data-ff-config`, base64-encoded JSON), `onSuccess.mode` was flipped from
`"redirect"` to `"message"`. The original config redirected the browser
immediately, with no delay, straight to an external Flodesk-hosted URL
(`https://consultation.bhumikabaral.com.np/thank-you`) the instant Flodesk's
script saw a successful submit — which would hijack navigation away from
this site before this page could send the visitor to `/thank-you`, and with
no pause for Flodesk's post-submit automation to settle. With `"message"`
mode, Flodesk instead shows its own inline success state (it sets
`data-ff-stage="success"` on the form's root element). `FlodeskForm.tsx`
watches for that attribute, and only once it appears — i.e. only after
Flodesk has confirmed the submission — waits about 2.2 seconds
(`REDIRECT_DELAY_MS`) and then routes to `/thank-you` itself. Adjust that
delay, or the redirect target, directly in that file.

## Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Deploy to Vercel

1. Push this project to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Next.js** (auto-detected). No environment variables
   are required for the current (backend-less) version.
4. Click **Deploy**. Vercel builds and gives you a live URL.

Or, from this folder, using the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## Project structure

```
app/
├── page.tsx           # Landing page (assembles all sections)
├── layout.tsx          # Fonts, SEO metadata, Open Graph tags
├── globals.css
└── thank-you/
    └── page.tsx         # Thank-you page shown after form submit

components/
├── Header.tsx           # Centered logo only, no nav
├── Logo.tsx              # Renders /public/logo.png via next/image
├── Hero.tsx
├── Problem.tsx
├── Benefits.tsx
├── Process.tsx
├── CTAForm.tsx           # "Book the Call" card — wraps FlodeskForm
└── FlodeskForm.tsx       # The live Flodesk embed + delayed redirect logic

app/icon.png              # Favicon (Next.js App Router picks this up automatically)
app/apple-icon.png         # Apple touch icon

public/
├── logo.png               # Bhumika Digital logo (used in the header)
└── og-image.svg            # Social share image (includes the logo)
```

Note: `public/consultation-intro.mp4` is no longer used (the Thank You page
now embeds a YouTube video instead) and can be deleted if you want to trim
the repo.

## Notes on what's included / left out

- **Urgency/scarcity section**: not built. No real urgency or scarcity
  detail (deadline, limited slots, etc.) was provided, and the brief was
  explicit not to invent one. Add a real one anytime by creating
  `components/Urgency.tsx` and dropping it into `app/page.tsx` between
  `<Process />` and `<CTAForm />`.
- **Sample images**: none were provided for visual inspiration, so the
  visual direction (light, premium, blue accent, soft gradient glow, rounded
  cards, generous white space) was designed from the brief's written
  description.
