import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";
import { LuSearch, LuShoppingBag } from "react-icons/lu";
import { Store } from "../../utils/Store";
import { useMounted } from "../../utils/useMounted";
import Wordmark from "./Wordmark";
import { NAV_LINKS } from "./navLinks";
import UserMenu from "./UserMenu";

/**
 * Site header.
 *
 * On pages that open with a photographic hero (`transparent`), the bar floats
 * over the image with no background at all and only takes on its solid ground
 * once the reader scrolls past the fold — so the first thing on screen is the
 * food, not a strip of chrome. Everywhere else it starts solid.
 *
 * The nav is split either side of a centred wordmark rather than sitting in a
 * row beside it: the name is the brand's strongest asset and a restaurant puts
 * it above the door, in the middle.
 */
export default function Header({ transparent = false }: { transparent?: boolean }) {
  const router = useRouter();
  const { state } = useContext(Store);
  const { cart, userInfo } = state;

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const mounted = useMounted();

  useEffect(() => {
    if (!transparent) return undefined;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  useEffect(() => {
    const close = () => {
      setMenuOpen(false);
      setSearchOpen(false);
    };
    router.events.on("routeChangeComplete", close);
    return () => router.events.off("routeChangeComplete", close);
  }, [router.events]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen && !searchOpen) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, searchOpen]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?query=${encodeURIComponent(trimmed)}`);
  };

  const basketCount = mounted
    ? cart.cartItems.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0)
    : 0;

  // Floating only while the reader is still on the hero image.
  const floating = transparent && !scrolled;

  const [left, right] = [NAV_LINKS.slice(0, 2), NAV_LINKS.slice(2)];

  const navLink = (link: { href: string; label: string }) => {
    const active =
      link.href === "/" ? router.pathname === "/" : router.pathname.startsWith(link.href);
    return (
      <li key={link.href}>
        <Link
          href={link.href}
          aria-current={active ? "page" : undefined}
          className={`link-wipe text-label font-medium uppercase whitespace-nowrap transition-colors ${
            floating
              ? "text-oat-100/85 hover:text-oat-100"
              : active
                ? "text-chilli-600"
                : "text-espresso-700 hover:text-chilli-600"
          }`}
        >
          {link.label}
        </Link>
      </li>
    );
  };

  return (
    <>
      <a href="#main" className="sr-only-focusable">
        Skip to main content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          floating
            ? "bg-transparent on-dark"
            : "bg-oat-100/95 backdrop-blur-md shadow-subtle"
        }`}
      >
        <div className="container">
          <div className="grid items-center h-[var(--header-height)] grid-cols-[auto_1fr_auto] lg:grid-cols-3 gap-4">
            {/* Left: nav on desktop, menu button on mobile */}
            <div className="flex items-center justify-start">
              <nav aria-label="Primary" className="hidden lg:block">
                <ul className="flex items-center gap-8">{left.map(navLink)}</ul>
              </nav>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className={`flex items-center justify-center w-11 h-11 -ml-2 rounded-full transition-colors lg:hidden ${
                  floating ? "text-oat-100" : "text-espresso-800"
                }`}
              >
                <HiOutlineMenuAlt4 className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Centre: the wordmark */}
            <div className="flex justify-center">
              <Link
                href="/"
                aria-label="Cheesy Kitchen — home"
                className="transition-opacity hover:opacity-80"
              >
                <Wordmark light={floating} />
              </Link>
            </div>

            {/* Right: nav, then utilities */}
            <div className="flex items-center justify-end gap-6">
              <nav aria-label="Secondary" className="hidden lg:block">
                <ul className="flex items-center gap-8">{right.map(navLink)}</ul>
              </nav>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setSearchOpen((open) => !open)}
                  aria-label="Search the menu"
                  aria-expanded={searchOpen}
                  className={`items-center justify-center hidden w-11 h-11 transition-colors rounded-full sm:flex ${
                    floating
                      ? "text-oat-100 hover:bg-white/10"
                      : "text-espresso-700 hover:bg-oat-200"
                  }`}
                >
                  <LuSearch className="w-5 h-5" aria-hidden="true" />
                </button>

                <Link
                  href="/cartFood"
                  aria-label={`Basket, ${basketCount} ${basketCount === 1 ? "item" : "items"}`}
                  className={`relative flex items-center justify-center w-11 h-11 transition-colors rounded-full ${
                    floating
                      ? "text-oat-100 hover:bg-white/10"
                      : "text-espresso-700 hover:bg-oat-200"
                  }`}
                >
                  <LuShoppingBag className="w-5 h-5" aria-hidden="true" />
                  {basketCount > 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute inline-flex items-center justify-center min-w-[1.15rem] h-[1.15rem] px-1 text-[0.625rem] font-semibold rounded-full text-oat-50 bg-chilli-600 top-1.5 right-1"
                    >
                      {basketCount}
                    </span>
                  )}
                </Link>

                {mounted && userInfo ? (
                  <UserMenu userInfo={userInfo} floating={floating} />
                ) : (
                  <Link
                    href="/login"
                    className={`hidden ml-2 btn btn-sm xl:inline-flex ${
                      floating ? "btn-line-light" : "btn-order"
                    }`}
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Search drops out of the bar rather than living in it permanently —
            a restaurant's header should be the name and the menu, not a
            search field. */}
        <div
          className={`overflow-hidden transition-all duration-300 border-t ${
            searchOpen
              ? "max-h-24 border-espresso-200/40 bg-oat-100"
              : "max-h-0 border-transparent"
          }`}
        >
          <div className="container py-4">
            <form onSubmit={handleSearch} role="search" className="relative max-w-xl mx-auto">
              <label htmlFor="site-search" className="sr-only">
                Search the menu
              </label>
              <input
                id="site-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="What are you hungry for?"
                tabIndex={searchOpen ? 0 : -1}
                className="input py-3 pr-14"
              />
              <button
                type="submit"
                aria-label="Search"
                tabIndex={searchOpen ? 0 : -1}
                className="absolute inset-y-0 right-0 flex items-center justify-center transition-colors w-14 text-espresso-400 hover:text-chilli-600"
              >
                <LuSearch className="w-5 h-5" aria-hidden="true" />
              </button>
            </form>
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

/**
 * Full-screen dark overlay menu rather than a side drawer: on a phone the
 * whole screen is the menu, the links are set large in the display serif, and
 * the ordering CTA is the last thing your thumb passes.
 */
function MobileMenu({ open, onClose, userInfo }: any) {
  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 on-dark ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-espresso-950" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="relative flex flex-col h-full"
      >
        <div className="container flex items-center justify-between h-[var(--header-height)]">
          <Wordmark light />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex items-center justify-center -mr-2 rounded-full w-11 h-11 text-oat-100"
          >
            <HiOutlineX className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="container flex-1 py-8 overflow-y-auto">
          <ul className="space-y-1">
            {NAV_LINKS.map((link, index) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-baseline gap-4 py-3 transition-colors font-display text-4xl text-oat-100 hover:text-saffron-400"
                >
                  <span
                    aria-hidden="true"
                    className="text-xs font-sans tabular-nums text-saffron-500/70"
                  >
                    0{index + 1}
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="container pb-10 space-y-4">
          <Link href="/foods" className="w-full btn btn-order">
            Order now
          </Link>

          {!userInfo && (
            <div className="grid grid-cols-2 gap-3">
              <Link href="/login" className="btn btn-line-light btn-sm">
                Sign in
              </Link>
              <Link href="/register" className="btn btn-line-light btn-sm">
                Register
              </Link>
            </div>
          )}

          <p className="pt-4 text-sm text-center border-t text-oat-400 border-white/10">
            15/e Lake Circus, Kalabagan &middot; Dhaka
          </p>
        </div>
      </div>
    </div>
  );
}
