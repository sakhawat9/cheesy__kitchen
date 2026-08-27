import { Cormorant_Garamond, Jost } from "next/font/google";

// Cormorant Garamond is a high-contrast old-style serif drawn from Garamond —
// it is the typeface of a printed menu, and at display sizes the thin strokes
// and long extenders give the page the elegance a dining room wants. It is
// deliberately not the geometric display serif the watch brand uses.
//
// Jost carries every label, nav item and paragraph: a geometric sans with warm,
// almost-circular bowls that keeps the UI friendly rather than corporate.
//
// Loaded via next/font so there's no render-blocking @import and both fonts
// self-host with zero layout shift.
export const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const bodyFont = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
