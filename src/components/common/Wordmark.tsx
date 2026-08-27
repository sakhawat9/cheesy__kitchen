/**
 * The brand logotype: "Cheesy" set large in the display serif with "Kitchen"
 * beneath it in letterspaced small caps between two rules.
 *
 * A stacked, centred mark like this is how a restaurant signs itself — it
 * reads as a sign above a door rather than as a nav-bar label, and it works at
 * any width because it never runs long horizontally.
 */
export default function Wordmark({
  light = false,
  size = "md",
}: {
  light?: boolean;
  size?: "sm" | "md";
}) {
  const sizes = {
    sm: { name: "text-xl", sub: "text-[0.5rem]", rule: "w-3" },
    md: { name: "text-2xl sm:text-[1.75rem]", sub: "text-[0.5625rem]", rule: "w-4 sm:w-5" },
  }[size];

  return (
    <span className="flex flex-col items-center leading-none select-none">
      <span
        className={`font-display font-semibold tracking-tight ${sizes.name} ${
          light ? "text-oat-50" : "text-espresso-900"
        }`}
      >
        Cheesy
      </span>

      <span
        className={`mt-1 flex items-center gap-1.5 uppercase tracking-[0.3em] font-medium ${
          sizes.sub
        } ${light ? "text-saffron-400" : "text-saffron-600"}`}
      >
        <span aria-hidden="true" className={`block h-px ${sizes.rule} bg-current opacity-60`} />
        Kitchen
        <span aria-hidden="true" className={`block h-px ${sizes.rule} bg-current opacity-60`} />
      </span>
    </span>
  );
}
