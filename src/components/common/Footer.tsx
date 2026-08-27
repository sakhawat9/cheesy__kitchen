import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import ScrollToTop from "react-scroll-to-top";
import { CATEGORIES } from "../menu/categories";

// Only real destinations are listed. The old footer's "Category" column
// linked to /barger, /pizza, /coffee and /chicken — none of which are routes
// (the real ones are nested under /category/) — and two of the four named
// categories no dish belonged to. These are generated from the same taxonomy
// the menu uses, so they can't drift again.
const COLUMNS = [
  {
    title: "Menu",
    links: [
      { label: "The full menu", href: "/foods" },
      { label: "Browse by category", href: "/category" },
      ...CATEGORIES.map((category) => ({
        label: category.name,
        href: `/category/${category.slug}`,
      })),
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/login" },
      { label: "Create account", href: "/register" },
      { label: "Account settings", href: "/profile" },
      { label: "Your basket", href: "/cartFood" },
      { label: "Leave a review", href: "/review-form" },
    ],
  },
  {
    title: "Kitchen",
    links: [
      { label: "Our story", href: "/aboutUs" },
      { label: "Meet the chefs", href: "/aboutUs#chefs" },
      { label: "Contact us", href: "/contact" },
      { label: "Opening hours", href: "/contact#hours" },
    ],
  },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/sakawat.hossain.338211",
    icon: FaFacebookF,
  },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shjsdev/", icon: FaLinkedinIn },
  { label: "Twitter", href: "https://twitter.com", icon: FaTwitter },
  { label: "Pinterest", href: "https://www.pinterest.com", icon: FaPinterestP },
  { label: "WhatsApp", href: "https://www.whatsapp.com", icon: FaWhatsapp },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 text-cream-400">
      <ScrollToTop
        smooth
        top={600}
        color="#FFFFFF"
        width="16"
        height="16"
        style={{
          backgroundColor: "#C0492B",
          borderRadius: "9999px",
          boxShadow: "0 8px 24px -8px rgba(26,21,18,0.4)",
          right: "1.5rem",
          bottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />

      <div className="container py-14 lg:py-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <p className="mb-4 text-lg font-bold tracking-[0.12em] text-white uppercase font-heading">
              Cheesy<span className="text-ember-500">_</span>Kitchen
            </p>
            <p className="max-w-xs mb-6 text-sm leading-relaxed">
              A small kitchen cooking a short menu properly — burgers smashed to
              order, dough proved for two days, chickens brined overnight.
              Delivered across Dhaka, free on every order.
            </p>

            <address className="text-sm not-italic leading-relaxed">
              15/e Lake Circus, Kalabagan
              <br />
              Dhaka, Bangladesh
              <br />
              <a
                href="mailto:sakhawathossain7969@gmail.com"
                className="inline-block mt-2 break-all transition-colors hover:text-ember-400"
              >
                sakhawathossain7969@gmail.com
              </a>
            </address>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="mb-4 font-sans text-sm font-semibold tracking-wider text-white uppercase">
                {column.title}
              </h2>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-ember-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} Cheesy_Kitchen. Designed &amp; built by{" "}
            <a
              href="https://github.com/sakhawat9"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors text-cream-300 hover:text-ember-400"
            >
              SH Shakib
            </a>
            .
          </p>

          <ul className="flex items-center gap-2">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Cheesy_Kitchen on ${label}`}
                  className="flex items-center justify-center transition-colors rounded-full w-9 h-9 bg-white/5 text-cream-300 hover:bg-ember-600 hover:text-white"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
