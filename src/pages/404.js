import Layout from "components/common/Layout";
import EmptyState from "components/ui/EmptyState";
import { MdOutlineRestaurantMenu } from "react-icons/md";

/**
 * The old 404 page was a blue band from an unrelated WordPress documentation
 * theme — four hotlinked illustration PNGs on a background colour used nowhere
 * else in this site, above copy apologising for "Fashion, Chair, Decoration"
 * collections that don't exist here.
 */
export default function NotFound() {
  return (
    <Layout title="Page not found">
      <div className="section">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <p className="mb-3 eyebrow">Error 404</p>
            <h1 className="mb-4">We can&apos;t find that page</h1>
            <p className="mb-10 text-charcoal-500">
              The link may be out of date, or the dish may have come off the
              menu. Here&apos;s the way back.
            </p>
          </div>

          <EmptyState
            as="h2"
            icon={MdOutlineRestaurantMenu}
            title="Try the menu instead"
            description="Everything the kitchen is cooking right now, in one place."
            action={{ label: "Browse the menu", href: "/foods" }}
            secondaryAction={{ label: "Back home", href: "/" }}
          />
        </div>
      </div>
    </Layout>
  );
}
