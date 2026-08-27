import { Fraunces, Inter } from "next/font/google";

// Fraunces is a soft, high-contrast serif with a slight wobble to its curves —
// warm and hand-made rather than corporate, which is what a kitchen brand
// wants. Inter carries the body copy and every UI label.
//
// Loaded via next/font so there's no render-blocking @import and the fonts
// self-host with zero layout shift.
export const headingFont = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

export const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
