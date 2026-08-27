import Layout from "components/common/Layout";
import Link from "next/link";
import { LuUtensilsCrossed } from "react-icons/lu";

export default function NotFound() {
  return (
    <Layout title="Page not found">
      <section className="flex items-center min-h-[70vh] surface-cream">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="flex items-center justify-center w-20 h-20 mx-auto mb-8 rounded-full bg-oat-200 text-chilli-600">
              <LuUtensilsCrossed className="w-8 h-8" aria-hidden="true" />
            </span>

            <p className="mb-5 text-6xl font-display text-saffron-500">404</p>

            <h1 className="mb-5 text-display">
              That&apos;s not on the menu
            </h1>

            <p className="mb-10 text-lg leading-relaxed text-espresso-500">
              The link may be out of date, or the dish may have come off the
              menu. Here&apos;s the way back to the kitchen.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/foods" className="btn btn-order btn-lg">
                See the menu
              </Link>
              <Link href="/" className="btn btn-line btn-lg">
                Back home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
