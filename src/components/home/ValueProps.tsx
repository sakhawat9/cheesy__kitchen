import { BiLeaf, BiLock, BiPhoneCall } from "react-icons/bi";
import { MdOutlineDeliveryDining } from "react-icons/md";

const FEATURES = [
  {
    icon: MdOutlineDeliveryDining,
    title: "Free delivery, always",
    description: "Every order across Dhaka ships free, with no minimum spend.",
  },
  {
    icon: BiLeaf,
    title: "Cooked to order",
    description: "Nothing sits under a heat lamp. It's made when you order it.",
  },
  {
    icon: BiLock,
    title: "Secure checkout",
    description: "Card details are handled by Stripe and never stored by us.",
  },
  {
    icon: BiPhoneCall,
    title: "A real kitchen to call",
    description: "Questions about an order go straight to the people cooking it.",
  },
];

/**
 * Trust strip. Deliberately quiet — a plain bordered row rather than four
 * shadowed cards, so it supports the food instead of competing with it.
 *
 * Replaces the old ContactAvailable band, which mixed a section heading, an
 * unlabelled phone number, three columns of opening hours and a Google Maps
 * iframe (pointing at a business in Khulna, not the Dhaka address in the
 * footer) into one unreadable block on the homepage. The hours and the map
 * now live on /contact, where someone looking for them would go.
 */
export default function ValueProps({ className = "" }: any) {
  return (
    <section className={`border-t border-cream-300 bg-cream-50 ${className}`}>
      <div className="container py-12 lg:py-14">
        {/* The strip is deliberately unheaded visually, but the items below
            are <h3>s — without this the homepage outline skips h1 to h3. */}
        <h2 className="sr-only">Why order from us</h2>

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex gap-4">
              <span className="flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-ember-100 text-ember-700">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="mb-1 font-sans text-base font-semibold text-charcoal-900">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-charcoal-500">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
