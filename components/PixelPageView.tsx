"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// The Meta Pixel's base snippet (in app/layout.tsx) only fires a PageView
// automatically on a full page load. The Thank You page is reached via
// client-side navigation (router.push from FlodeskForm.tsx), which doesn't
// trigger a new page load, so that view would otherwise never be counted.
// This fires it manually once the pixel script (loaded in the root layout)
// is ready.
export default function PixelPageView() {
  useEffect(() => {
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, []);

  return null;
}
