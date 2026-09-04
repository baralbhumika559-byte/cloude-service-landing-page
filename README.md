# Bhumika Digital — Free AI Marketing Consultation Landing Page

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Mobile-first, single
goal: get the visitor to submit the consultation form.

## Before you deploy

Nothing left to fill in — the logo, WhatsApp number, and "watch this before
your call" video are all wired in:

- **Video** — self-hosted at `public/consultation-intro.mp4`, played with a
  native `<video>` element in `app/thank-you/page.tsx` (constant
  `VIDEO_SRC`). It's a portrait video (478×850), so the player is sized for
  that instead of a widescreen frame. Swap the file (keep the same filename,
  or update `VIDEO_SRC`) any time you have a different cut.
- **WhatsApp number** — `WHATSAPP_NUMBER` in the same file.

The form works out of the box (see below) — no other setup required.

## What the form does right now

There's no backend yet. On submit, the form validates all required fields,
then simulates a short delay and redirects to `/thank-you`. To actually
receive leads, replace the block marked `// No backend yet` in
`components/CTAForm.tsx` with a real request — e.g.:

```ts
await fetch("/api/lead", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(values),
});
```

and add an `app/api/lead/route.ts` that forwards to your CRM, Google Sheet,
email, or WhatsApp Business API.

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
└── CTAForm.tsx           # Validated form + redirect to /thank-you

app/icon.png              # Favicon (Next.js App Router picks this up automatically)
app/apple-icon.png         # Apple touch icon

public/
├── logo.png               # Bhumika Digital logo (used in the header)
├── og-image.svg            # Social share image (includes the logo)
└── consultation-intro.mp4  # "Watch this before your call" video
```

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
