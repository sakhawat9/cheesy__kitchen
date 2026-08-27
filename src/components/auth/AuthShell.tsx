import Link from "next/link";

/**
 * Two-column shell shared by sign-in and register: the form on one side, a
 * quiet brand panel on the other. Both pages previously rendered a bare
 * centred form with no header, no footer and no visual identity at all.
 */
export default function AuthShell({ title, subtitle, children, footer }: any) {
  return (
    <div className="section">
      <div className="container">
        <div className="grid max-w-5xl gap-10 mx-auto lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <h1 className="mb-2">{title}</h1>
            {subtitle && <p className="mb-8 text-charcoal-500">{subtitle}</p>}

            {children}

            {footer && (
              <p className="mt-8 text-sm text-center text-charcoal-500">{footer}</p>
            )}
          </div>

          {/* Decorative panel — hidden below lg, where it would just push the
              form off the first screen. */}
          <aside className="hidden p-10 lg:block rounded-card bg-charcoal-900">
            <p className="mb-4 eyebrow text-ember-400">Cheesy_Kitchen</p>
            <p className="mb-6 text-2xl leading-snug text-white font-heading">
              A short menu, cooked properly, delivered free across Dhaka.
            </p>
            <ul className="space-y-3 text-sm text-cream-400">
              <li className="flex gap-3">
                <span aria-hidden="true" className="text-ember-500">
                  —
                </span>
                Save your delivery details so reordering takes one tap.
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="text-ember-500">
                  —
                </span>
                Keep a basket between visits, on any device.
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="text-ember-500">
                  —
                </span>
                Tell us what you thought — reviews go straight to the chefs.
              </li>
            </ul>

            <Link href="/foods" className="mt-8 btn btn-on-dark btn-sm">
              Have a look at the menu
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
