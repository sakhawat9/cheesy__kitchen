import Image from "next/image";
import Link from "next/link";
import Reveal from "../ui/Reveal";

/**
 * The closing call to order.
 *
 * A full-bleed photograph with a heavy scrim and the invitation set large over
 * it — the last thing on the page before the practical details, and the only
 * band on the site that uses the photograph edge-to-edge with no container
 * around it.
 */
export default function OrderCTA({ image }: { image?: string }) {
  return (
    <section className="relative overflow-hidden isolate on-dark bg-espresso-950">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-espresso-950 via-espresso-950/80 to-espresso-950/40"
          />
        </>
      )}

      <div className="container relative py-24 lg:py-32">
        <Reveal className="max-w-2xl">
          <p className="mb-6 label-rule text-saffron-400">Ready when you are</p>

          <p className="text-display-lg text-oat-50 font-display">
            Order tonight, and we&apos;ll start cooking the moment your ticket
            prints.
          </p>

          <p className="max-w-lg mt-6 text-lg leading-relaxed text-oat-300">
            Free delivery anywhere in Dhaka, on every order, with no minimum
            spend.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-10">
            <Link href="/foods" className="btn btn-order btn-lg">
              Order now
            </Link>
            <Link href="/contact" className="btn btn-line-light btn-lg">
              Book a table
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
