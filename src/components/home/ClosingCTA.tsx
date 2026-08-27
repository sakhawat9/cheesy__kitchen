import Link from "next/link";
import { MdArrowForward } from "react-icons/md";

/**
 * Closing call to action. Gives the homepage a deliberate ending — previously
 * it stopped dead on the contact/map band with no next step offered.
 */
export default function ClosingCTA() {
  return (
    <section className="section-dark">
      <div className="container py-section-sm">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="mb-3 eyebrow text-ember-400">How we cook</p>
            <h2 className="mb-4 text-white">
              A short menu, because a long one is a lie
            </h2>
            <p className="max-w-xl text-cream-400">
              Every dish on this menu is here because the kitchen makes it well
              enough to put its name on. Dough proves for two days. Chickens are
              brined overnight. Sauces are built in the pan, not poured from a
              carton. If something stops meeting that standard, it comes off the
              menu rather than staying on it quietly.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <Link href="/foods" className="btn btn-accent btn-lg">
              Order tonight
              <MdArrowForward className="w-5 h-5" aria-hidden="true" />
            </Link>
            <Link href="/aboutUs" className="btn btn-on-dark btn-lg">
              Our kitchen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
