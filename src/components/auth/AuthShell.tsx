import Image from "next/image";
import Link from "next/link";
import Wordmark from "../common/Wordmark";

/**
 * Split-screen shell shared by sign-in and register: the form on a warm cream
 * panel, a full-height photograph of the food alongside it.
 *
 * The photograph is passed in from the live menu rather than hardcoded, so the
 * auth screens can never end up showing food the kitchen doesn't serve. On
 * anything below `lg` the image is dropped entirely — it would push the form
 * off the first screen on a phone, which is exactly where signing in matters
 * most.
 */
export default function AuthShell({ title, subtitle, image, children, footer }: any) {
  return (
    <div className="grid min-h-[calc(100vh-var(--header-height))] lg:grid-cols-2">
      {/* Form */}
      <div className="flex items-center justify-center px-5 py-16 sm:px-10 surface-cream">
        <div className="w-full max-w-md">
          <h1 className="mb-3 text-display">{title}</h1>
          {subtitle && (
            <p className="mb-10 text-lg leading-relaxed text-espresso-500">
              {subtitle}
            </p>
          )}

          {children}

          {footer && (
            <p className="mt-10 text-sm text-center text-espresso-500">{footer}</p>
          )}
        </div>
      </div>

      {/* Photograph */}
      <div className="relative hidden lg:block bg-espresso-900 on-dark">
        {image && (
          <Image
            src={image}
            alt=""
            fill
            sizes="50vw"
            className="object-cover opacity-60"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/40 to-espresso-950/20"
        />

        <div className="relative flex flex-col justify-between h-full p-12">
          <Wordmark light size="sm" />

          <div>
            <p className="max-w-md text-4xl leading-tight font-display text-oat-50">
              Burgers smashed to order, dough proved for two days, chickens
              brined overnight.
            </p>
            <Link href="/foods" className="mt-8 btn btn-line-light btn-sm">
              See the menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
