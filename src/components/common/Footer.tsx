import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { LuClock, LuMapPin, LuMail } from "react-icons/lu";
import { CATEGORIES } from "../menu/categories";
import Wordmark from "./Wordmark";

const HOURS = [
  { days: "Mon – Sat", time: "8:00 AM – 11:00 PM" },
  { days: "Sunday", time: "11:00 AM – 3:00 PM" },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/sakawat.hossain.338211",
    icon: FaFacebookF,
  },
  { label: "Instagram", href: "https://www.instagram.com", icon: FaInstagram },
  { label: "WhatsApp", href: "https://www.whatsapp.com", icon: FaWhatsapp },
];

/**
 * Footer.
 *
 * Built around the three things someone actually looks for at the bottom of a
 * restaurant's site — where it is, when it's open, and how to order — rather
 * than a five-column directory of every route. The menu categories are
 * generated from the same taxonomy the kitchen uses, so they can't drift.
 */
export default function Footer() {
  return (
    <footer className="surface-deep on-dark">
      {/* Closing invitation, straddling the top edge of the footer. */}
      <div className="container">
        <div className="py-14 border-b border-white/10 lg:py-16">
          <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <p className="mb-3 label-rule text-saffron-400">Hungry?</p>
              <p className="max-w-lg text-3xl leading-tight sm:text-4xl font-display text-oat-100">
                The kitchen is open. Everything is cooked to order and delivered
                free across Dhaka.
              </p>
            </div>
            <Link href="/foods" className="shrink-0 btn btn-order btn-lg">
              Order now
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div>
            <div className="flex justify-start">
              <Wordmark light size="sm" />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-oat-400">
              A small kitchen cooking a short menu properly — burgers smashed to
              order, dough proved for two days, chickens brined overnight.
            </p>

            <ul className="flex items-center gap-2 mt-6">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Cheesy Kitchen on ${label}`}
                    className="flex items-center justify-center w-10 h-10 transition-colors border rounded-full border-white/15 text-oat-300 hover:bg-saffron-500 hover:text-espresso-900 hover:border-saffron-500"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Find us */}
          <div>
            <h2 className="mb-5 label text-saffron-400">Find us</h2>
            <ul className="space-y-4 text-sm text-oat-400">
              <li className="flex gap-3">
                <LuMapPin
                  className="w-4 h-4 mt-1 shrink-0 text-saffron-500"
                  aria-hidden="true"
                />
                <address className="not-italic leading-relaxed">
                  15/e Lake Circus, Kalabagan
                  <br />
                  Dhaka, Bangladesh
                </address>
              </li>
              <li className="flex gap-3">
                <LuMail
                  className="w-4 h-4 mt-1 shrink-0 text-saffron-500"
                  aria-hidden="true"
                />
                <a
                  href="mailto:sakhawathossain7969@gmail.com"
                  className="break-all transition-colors hover:text-oat-100"
                >
                  sakhawathossain7969@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h2 className="mb-5 label text-saffron-400">Kitchen hours</h2>
            <dl className="space-y-3 text-sm">
              {HOURS.map((entry) => (
                <div key={entry.days} className="flex items-baseline gap-3">
                  <LuClock
                    className="w-4 h-4 shrink-0 text-saffron-500"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-oat-200">{entry.days}</dt>
                    <dd className="text-oat-400">{entry.time}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* Menu */}
          <div>
            <h2 className="mb-5 label text-saffron-400">The menu</h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/foods"
                  className="transition-colors text-oat-400 hover:text-saffron-400"
                >
                  Everything we cook
                </Link>
              </li>
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="transition-colors text-oat-400 hover:text-saffron-400"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/aboutUs"
                  className="transition-colors text-oat-400 hover:text-saffron-400"
                >
                  Our story
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-sm sm:flex-row text-oat-500">
          <p>&copy; {new Date().getFullYear()} Cheesy Kitchen. All rights reserved.</p>
          <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <Link href="/contact" className="transition-colors hover:text-oat-200">
              Contact
            </Link>
            <Link href="/profile" className="transition-colors hover:text-oat-200">
              Your account
            </Link>
            <span>
              Built by{" "}
              <a
                href="https://github.com/sakhawat9"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-oat-200"
              >
                SH Shakib
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
