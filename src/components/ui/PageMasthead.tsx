import Image from "next/image";
import Link from "next/link";

/**
 * The opener on every inner page: a full-bleed photograph, darkened, with the
 * title set large over it and the breadcrumb trail beneath.
 *
 * This replaces a flat dark banner bar. A restaurant's inner pages should
 * still be selling the food, so each one opens on a photograph — passed in as
 * `image`, usually a real dish from the menu, so the artwork can never drift
 * away from what the kitchen serves.
 *
 * Pass no `image` for a plain warm band (used by account and checkout screens,
 * where a giant photo of a burger over "Delivery details" would be absurd).
 */
export default function PageMasthead({
  label,
  title,
  description,
  crumbs = [],
  image,
  imageAlt = "",
  compact = false,
}: any) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];

  return (
    <header
      className={`relative overflow-hidden ${
        image ? "bg-espresso-900" : "bg-espresso-900"
      }`}
    >
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-45"
          />
          {/* Two scrims: a flat one to guarantee contrast at any height, and a
              bottom-weighted gradient so the photograph keeps its depth. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-espresso-950/45"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/35 to-espresso-950/60"
          />
        </>
      )}

      <div
        className={`container relative on-dark ${
          compact
            ? "pt-24 pb-7 md:pt-28 md:pb-8"
            : image
              ? "pt-32 pb-16 md:pt-40 md:pb-24"
              : "pt-32 pb-14 md:pt-36 md:pb-16"
        }`}
      >
        {label && <span className="mb-5 label-rule text-saffron-400">{label}</span>}

        {title && (
          <h1
            className={`text-oat-100 ${compact ? "text-h1" : "text-display-lg"} max-w-3xl`}
          >
            {title}
          </h1>
        )}

        {description && (
          <p className="max-w-xl mt-5 text-lg leading-relaxed text-oat-400">
            {description}
          </p>
        )}

        {trail.length > 1 && (
          <nav aria-label="Breadcrumb" className="mt-8">
            <ol className="flex flex-wrap items-center text-sm gap-x-2 gap-y-1">
              {trail.map((crumb: any, index: number) => {
                const isLast = index === trail.length - 1;
                return (
                  <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                    {index > 0 && (
                      <span aria-hidden="true" className="text-espresso-500">
                        /
                      </span>
                    )}
                    {isLast || !crumb.href ? (
                      <span className="text-saffron-400" aria-current="page">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="transition-colors text-oat-400 hover:text-oat-100"
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
      </div>
    </header>
  );
}
