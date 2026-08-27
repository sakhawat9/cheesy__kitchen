import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { MdOutlineSearch, MdOutlineShoppingBasket } from "react-icons/md";
import { Store } from "../../utils/Store";
import { useMounted } from "../../utils/useMounted";
import { NAV_LINKS } from "./navLinks";
import UserMenu from "./UserMenu";

/**
 * Single site header.
 *
 * The previous version pulled in `react-modern-drawer` (and its stylesheet) for
 * the mobile menu, rendered a second, different nav inside it, and printed the
 * cart count straight from a cookie during SSR — which mismatched on hydration
 * every time the basket wasn't empty. This is one flat nav, sticky, with a
 * self-contained drawer that traps scroll and closes on navigation.
 */
export default function Header() {
  const router = useRouter();
  const { state } = useContext(Store);
  const { cart, userInfo } = state;

  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Basket contents come from a cookie, which the server can't read.
  // Hold the count back until after hydration so the markup matches.
  const mounted = useMounted();

  // Close the drawer on navigation, otherwise it stays open behind the new page.
  useEffect(() => {
    const close = () => setMenuOpen(false);
    router.events.on("routeChangeComplete", close);
    return () => router.events.off("routeChangeComplete", close);
  }, [router.events]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape closes the drawer.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?query=${encodeURIComponent(trimmed)}`);
  };

  const basketCount = mounted
    ? cart.cartItems.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0)
    : 0;

  return (
    <>
      <a href="#main" className="sr-only-focusable">
        Skip to main content
      </a>

      {/* Utility bar — hidden on small screens where it would push the nav
          below the fold. */}
      <div className="hidden text-sm text-cream-400 bg-charcoal-950 md:block">
        <div className="container flex items-center justify-between py-2">
          <p>Kitchen open daily · Delivery across Dhaka</p>
          <p className="hidden lg:block">
            Free delivery on every order — no minimum spend
          </p>
          <a
            href="mailto:sakhawathossain7969@gmail.com"
            className="transition-colors hover:text-ember-400"
          >
            sakhawathossain7969@gmail.com
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white border-b border-cream-300">
        <div className="container">
          <div className="flex items-center justify-between h-[var(--header-height)] gap-4">
            <Link
              href="/"
              className="text-lg font-bold tracking-[0.12em] uppercase font-heading text-charcoal-900 shrink-0"
            >
              Cheesy<span className="text-ember-600">_</span>Kitchen
            </Link>

            {/* Primary navigation */}
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {NAV_LINKS.map((link) => {
                  const active =
                    link.href === "/"
                      ? router.pathname === "/"
                      : router.pathname.startsWith(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={`inline-block px-3 py-2 text-sm font-medium transition-colors rounded ${
                          active
                            ? "text-ember-700"
                            : "text-charcoal-700 hover:text-ember-700"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Search — a real labelled form with a submit button. The old
                header had no search at all, though /Search existed as a page
                nothing linked to. */}
            <form
              onSubmit={handleSearch}
              role="search"
              className="relative flex-1 hidden max-w-xs md:block"
            >
              <label htmlFor="site-search" className="sr-only">
                Search the menu
              </label>
              <input
                id="site-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the menu"
                className="input py-2.5 pr-11 text-sm"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute inset-y-0 right-0 flex items-center justify-center transition-colors w-11 text-charcoal-400 hover:text-ember-700"
              >
                <MdOutlineSearch className="w-5 h-5" aria-hidden="true" />
              </button>
            </form>

            <div className="flex items-center gap-1 shrink-0">
              <Link
                href="/cartFood"
                aria-label={`Basket, ${basketCount} ${basketCount === 1 ? "item" : "items"}`}
                className="relative flex items-center justify-center w-10 h-10 transition-colors rounded text-charcoal-800 hover:text-ember-700"
              >
                <MdOutlineShoppingBasket className="w-5 h-5" aria-hidden="true" />
                {basketCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute inline-flex items-center justify-center min-w-[1.125rem] h-[1.125rem] px-1 text-[0.625rem] font-bold text-white rounded-full bg-ember-600 top-1 right-0.5"
                  >
                    {basketCount}
                  </span>
                )}
              </Link>

              {mounted && userInfo ? (
                <UserMenu userInfo={userInfo} />
              ) : (
                <Link
                  href="/login"
                  className="hidden ml-2 btn btn-primary btn-sm sm:inline-flex"
                >
                  Sign in
                </Link>
              )}

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="flex items-center justify-center w-10 h-10 rounded text-charcoal-800 lg:hidden"
              >
                <BiMenu className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        userInfo={mounted ? userInfo : null}
      />
    </>
  );
}

function MobileMenu({ open, onClose, userInfo }: any) {
  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 transition-opacity duration-200 bg-charcoal-950/60 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`absolute inset-y-0 left-0 flex flex-col w-[min(20rem,85vw)] bg-white shadow-popover transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 border-b h-[var(--header-height)] border-cream-300">
          <span className="text-base font-bold tracking-[0.12em] uppercase font-heading text-charcoal-900">
            Cheesy<span className="text-ember-600">_</span>Kitchen
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex items-center justify-center w-10 h-10 rounded text-charcoal-700"
          >
            <BiX className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-0.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-3 py-3 text-base font-medium transition-colors rounded text-charcoal-800 hover:bg-cream-100 hover:text-ember-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {!userInfo && (
          <div className="grid grid-cols-2 gap-3 p-5 border-t border-cream-300">
            <Link href="/login" className="btn btn-primary btn-sm">
              Sign in
            </Link>
            <Link href="/register" className="btn btn-outline btn-sm">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
