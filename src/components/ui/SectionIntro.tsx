import Reveal from "./Reveal";

/**
 * Opens a section: a saffron rule-and-label mark, a large serif title, and an
 * optional supporting line.
 *
 * Deliberately left-aligned by default and asymmetric — the title sits in a
 * narrow measure with room beside it, rather than a centred stack. `align`
 * centres it for the few bands (reviews, menu) where symmetry suits.
 */
export default function SectionIntro({
  label,
  title,
  description,
  as: Tag = "h2",
  align = "left",
  dark = false,
  size = "display",
  className = "",
  children,
}: any) {
  const centred = align === "center";

  return (
    <Reveal
      className={`flex flex-col ${
        centred ? "items-center text-center mx-auto max-w-2xl" : "items-start max-w-xl"
      } ${className}`}
    >
      {label && (
        <span className={`label-rule mb-5 ${dark ? "text-saffron-400" : ""}`}>
          {label}
        </span>
      )}

      <Tag
        className={`${size === "display" ? "text-display" : "text-h1"} ${
          dark ? "text-oat-100" : "text-espresso-900"
        }`}
      >
        {title}
      </Tag>

      {description && (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            dark ? "text-oat-400" : "text-espresso-500"
          }`}
        >
          {description}
        </p>
      )}

      {children}
    </Reveal>
  );
}
