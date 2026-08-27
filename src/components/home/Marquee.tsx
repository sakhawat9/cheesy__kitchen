const PHRASES = [
  "Smashed to order",
  "48-hour dough",
  "Brined overnight",
  "Free delivery in Dhaka",
  "Cooked when you order it",
  "No freezer, no heat lamp",
];

/**
 * A slow ticker of the kitchen's promises between the hero and the story.
 *
 * It carries brand personality where a row of icon-and-label "features" would
 * carry the same information in the voice of a software landing page. The
 * track is duplicated and translated by exactly -50%, so the loop is seamless;
 * the copy is marked `aria-hidden` on the duplicate so it is announced once.
 */
export default function Marquee() {
  const Track = ({ duplicate = false }: { duplicate?: boolean }) => (
    <ul
      className="flex items-center shrink-0"
      aria-hidden={duplicate || undefined}
    >
      {PHRASES.map((phrase) => (
        <li key={phrase} className="flex items-center gap-8 px-8 whitespace-nowrap">
          <span className="text-2xl italic sm:text-3xl font-display text-oat-100">
            {phrase}
          </span>
          <span
            aria-hidden="true"
            className="block w-1.5 h-1.5 rounded-full bg-saffron-500"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="py-6 overflow-hidden border-y bg-espresso-900 border-white/10">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        <Track />
        <Track duplicate />
      </div>
    </div>
  );
}
