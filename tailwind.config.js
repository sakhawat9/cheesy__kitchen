/** @type {import('tailwindcss').Config} */

// ---------------------------------------------------------------------------
// Cheesy_Kitchen design tokens
//
// Three families carry the whole brand:
//   charcoal — warm near-black. Body text, dark surfaces, the footer.
//   ember    — toasted paprika. CTAs, prices, active states. Used sparingly.
//   cream    — warm oat. Section backgrounds and hairline borders.
//
// A food brand wants warmth, so every neutral is tinted toward red/yellow
// rather than blue — a "gray" here is never a true gray.
//
// Everything else (success/warning/danger/info) exists only for feedback
// states, so a page never invents a colour that isn't in this file.
// ---------------------------------------------------------------------------
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },

      colors: {
        charcoal: {
          DEFAULT: "#1A1512",
          50: "#F7F5F3",
          100: "#EAE6E1",
          200: "#D4CCC4",
          300: "#B0A69C",
          400: "#8A7E74",
          500: "#665C53",
          600: "#4A423B",
          700: "#332D28",
          800: "#241F1B",
          900: "#1A1512",
          950: "#0F0C0A",
        },

        ember: {
          DEFAULT: "#C0492B",
          50: "#FDF5F2",
          100: "#FBE8E2",
          200: "#F5CEC1",
          300: "#EDAC97",
          400: "#E08163",
          500: "#D0603C",
          600: "#C0492B",
          700: "#9E3822",
          800: "#772A19",
          900: "#4B1A10",
        },

        cream: {
          DEFAULT: "#FAF6F0",
          50: "#FEFCF9",
          100: "#FAF6F0",
          200: "#F3EDE3",
          300: "#E8DECE",
          400: "#D8C9B2",
          500: "#FAF6F0",
          600: "#C0AC8E",
          700: "#9C8869",
          800: "#736450",
          900: "#4A4034",
        },

        // A single supporting hue, for "fresh"/veg signals and the dashboard
        // charts. Deliberately muted so it never competes with ember.
        basil: { DEFAULT: "#3F6B4A", soft: "#EAF1EB", strong: "#2F5238" },

        // Feedback colours. Each has a `soft` tint for backgrounds so alerts
        // never need an off-palette gray.
        success: { DEFAULT: "#2F7A52", soft: "#E8F3EC", strong: "#1F5C3B" },
        warning: { DEFAULT: "#9A6700", soft: "#FBF2E0", strong: "#7A5200" },
        danger: { DEFAULT: "#B3261E", soft: "#FBEAE9", strong: "#8C1D17" },
        info: { DEFAULT: "#2C5F8A", soft: "#E8F0F7", strong: "#22496B" },
      },

      fontSize: {
        // [size, { lineHeight, letterSpacing }] — the whole type scale lives
        // here so headings stay consistent without per-component overrides.
        "display-lg": ["clamp(2.75rem, 5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        display: ["clamp(2.25rem, 4vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h1: ["clamp(2rem, 3.2vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        h2: ["clamp(1.625rem, 2.6vw, 2.125rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h3: ["clamp(1.25rem, 1.9vw, 1.5rem)", { lineHeight: "1.3" }],
        h4: ["1.125rem", { lineHeight: "1.4" }],
        eyebrow: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.18em" }],
      },

      spacing: {
        section: "clamp(3.5rem, 7vw, 6rem)",
        "section-sm": "clamp(2.5rem, 5vw, 4rem)",
      },

      maxWidth: {
        container: "82rem",
        prose: "68ch",
      },

      // Softer than the watch brand's near-square corners: food packaging and
      // plates are round, and the extra radius reads as friendly rather than
      // clinical.
      borderRadius: {
        DEFAULT: "0.5rem",
        card: "0.875rem",
      },

      boxShadow: {
        // Warm-tinted shadows: neutral black reads cold against the cream palette.
        subtle: "0 1px 2px rgba(26, 21, 18, 0.05)",
        card: "0 1px 3px rgba(26, 21, 18, 0.06), 0 6px 16px -8px rgba(26, 21, 18, 0.10)",
        lift: "0 4px 8px rgba(26, 21, 18, 0.06), 0 18px 32px -12px rgba(26, 21, 18, 0.18)",
        popover: "0 8px 32px -8px rgba(26, 21, 18, 0.22)",
      },

      transitionDuration: { DEFAULT: "200ms" },

      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 400ms ease-out both",
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};
