import Link from "next/link";
import { MdChevronRight } from "react-icons/md";

/**
 * Dark banner that opens every inner page: breadcrumb trail, H1, and an
 * optional supporting line. Gives the site a consistent entry point and
 * anchors the single <h1> per page — previously inner pages had no <h1> at
 * all, because <Title> emitted only <h2>s.
 *
 * `crumbs` is [{ label, href }] — the last entry renders as plain text and is
 * marked aria-current, so it isn't announced as a link to the current page.
 *
 * Omit `title` to render a compact breadcrumb-only bar. The dish detail page
 * does this so the dish name is the page's single <h1>.
 */
export default function PageHeader({
  eyebrow,
  title,
  description,
  crumbs = [],
}: any) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];

  return (
    <header className="bg-charcoal-900">
      <div className={title ? "container py-12 md:py-16" : "container py-4"}>
        {trail.length > 1 && (
          <nav aria-label="Breadcrumb" className={title ? "mb-5" : ""}>
            <ol className="flex flex-wrap items-center gap-1 text-sm">
              {trail.map((crumb: any, index: number) => {
                const isLast = index === trail.length - 1;
                return (
                  <li key={`${crumb.label}-${index}`} className="flex items-center gap-1">
                    {index > 0 && (
                      <MdChevronRight
                        className="w-4 h-4 text-charcoal-400"
                        aria-hidden="true"
                      />
                    )}
                    {isLast || !crumb.href ? (
                      <span className="text-cream-400" aria-current="page">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="transition-colors text-charcoal-300 hover:text-ember-400"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        {eyebrow && title && <p className="mb-3 eyebrow text-ember-400">{eyebrow}</p>}

        {title && <h1 className="text-white">{title}</h1>}

        {title && description && (
          <p className="max-w-xl mt-4 text-cream-400">{description}</p>
        )}
      </div>
    </header>
  );
}
