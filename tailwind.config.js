/** @type {import('tailwindcss').Config} */

// ---------------------------------------------------------------------------
// Cheesy Kitchen design tokens
//
// The brand is a warm, dimly-lit dining room. Two decisions drive everything:
//
//   1. Dark-first. The dominant surface is `espresso` — a warm brown-black —
//      with `oat` cream as the relief, not the other way round. Light sections
//      are the exception that makes the dark ones feel like a room.
//
//   2. Two accents, not one. `saffron` is the warm golden light: labels,
//      rules, star ratings, numerals. `chilli` is the appetite: every button
//      that takes an order. Splitting decoration from action keeps the CTAs
//      loud without the whole page shouting.
//
// Geometry is round throughout — pill buttons, deep card radii, circular
// "plate" image crops — because nothing in a kitchen has a sharp corner.
// ---------------------------------------------------------------------------
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },

      colors: {
        // Warm brown-black. Every step is tinted toward red so the dark
        // surfaces read as candlelit rather than as a slate UI chrome.
        espresso: {
          DEFAULT: "#191110",
          50: "#FAF7F5",
          100: "#F0E9E5",
          200: "#DED2CB",
          300: "#BFAEA4",
          400: "#968276",
          500: "#6E5C52",
          600: "#4F4038",
          700: "#382C26",
          800: "#261D19",
          900: "#191110",
          950: "#0D0908",
        },

        // Golden lamplight. Decorative only — labels, rules, ratings, numerals.
        saffron: {
          DEFAULT: "#E9A23B",
          50: "#FEF9EF",
          100: "#FCEFD6",
          200: "#F8DCAB",
          300: "#F3C577",
          400: "#EDB253",
          500: "#E9A23B",
          600: "#CE8324",
          700: "#A5641C",
          800: "#754618",
          900: "#432810",
        },

        // Deep tomato. Reserved for actions: order, add, checkout, submit.
        chilli: {
          DEFAULT: "#C0342A",
          50: "#FDF3F2",
          100: "#FBE2DF",
          200: "#F5BFB9",
          300: "#EC948B",
          400: "#DD6154",
          500: "#CE4638",
          600: "#C0342A",
          700: "#9A2620",
          800: "#6E1A16",
          900: "#42100D",
        },

        // Warm cream. The light surfaces and the type that sits on dark ones.
        oat: {
          DEFAULT: "#FBF5EA",
          50: "#FEFCF7",
          100: "#FBF5EA",
          200: "#F5EBD8",
          300: "#EADCC0",
          400: "#D9C6A3",
          500: "#FBF5EA",
          600: "#BFA983",
          700: "#9A8465",
          800: "#6F5E47",
          900: "#453A2C",
        },

        // Supporting green for "fresh" signals and the dashboard charts.
        basil: { DEFAULT: "#4A7A55", soft: "#EDF3EC", strong: "#33573A" },

        success: { DEFAULT: "#2F7A52", soft: "#E8F3EC", strong: "#1F5C3B" },
        warning: { DEFAULT: "#9A6700", soft: "#FBF2E0", strong: "#7A5200" },
        danger: { DEFAULT: "#B3261E", soft: "#FBEAE9", strong: "#8C1D17" },
        info: { DEFAULT: "#2C5F8A", soft: "#E8F0F7", strong: "#22496B" },
      },

      fontSize: {
        // Display sizes run large and tight: the serif is high-contrast and
        // only earns its keep at size.
        hero: ["clamp(3rem, 8vw, 6.5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.015em" }],
        display: ["clamp(2.125rem, 4.5vw, 3.5rem)", { lineHeight: "1.06", letterSpacing: "-0.01em" }],
        h1: ["clamp(1.875rem, 3.4vw, 2.875rem)", { lineHeight: "1.12" }],
        h2: ["clamp(1.625rem, 2.8vw, 2.25rem)", { lineHeight: "1.18" }],
        h3: ["clamp(1.25rem, 1.9vw, 1.5rem)", { lineHeight: "1.3" }],
        h4: ["1.125rem", { lineHeight: "1.4" }],
        // Letterspaced small caps, used for every label and nav item.
        label: ["0.6875rem", { lineHeight: "1.2", letterSpacing: "0.22em" }],
      },

      spacing: {
        section: "clamp(4rem, 9vw, 8rem)",
        "section-sm": "clamp(3rem, 6vw, 5rem)",
      },

      maxWidth: {
        container: "84rem",
        prose: "64ch",
      },

      borderRadius: {
        DEFAULT: "0.625rem",
        card: "1.25rem",
        panel: "1.75rem",
      },

      boxShadow: {
        subtle: "0 1px 2px rgba(25, 17, 16, 0.06)",
        card: "0 2px 8px -2px rgba(25, 17, 16, 0.08), 0 12px 28px -12px rgba(25, 17, 16, 0.16)",
        lift: "0 8px 16px -6px rgba(25, 17, 16, 0.10), 0 28px 56px -20px rgba(25, 17, 16, 0.28)",
        popover: "0 12px 40px -10px rgba(25, 17, 16, 0.32)",
        // Warm glow behind the chilli CTAs.
        glow: "0 10px 30px -10px rgba(192, 52, 42, 0.55)",
      },

      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
      },

      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(1.25rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        // Slow drift across a hero photograph, so the plate is never static.
        kenburns: {
          from: { transform: "scale(1) translate3d(0,0,0)" },
          to: { transform: "scale(1.08) translate3d(0,-1.5%,0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: {
        rise: "rise 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
        kenburns: "kenburns 18s ease-out alternate infinite",
        marquee: "marquee 38s linear infinite",
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};
