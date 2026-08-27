import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { BiHome, BiLogOutCircle, BiPlusCircle, BiReceipt, BiSolidDashboard } from "react-icons/bi";
import { BiMenu, BiX } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Cookies from "js-cookie";
import Wordmark from "../common/Wordmark";
import { Store } from "../../utils/Store";
import { useMounted } from "../../utils/useMounted";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: BiSolidDashboard },
  { href: "/dashboard/foods/addFoods", label: "Add a dish", icon: BiPlusCircle },
  { href: "/dashboard/foods/managefoods", label: "Manage menu", icon: FiEdit },
  { href: "/dashboard/allOrder", label: "Orders", icon: BiReceipt },
];

/**
 * Admin shell.
 *
 * Replaces the react-minimal-side-navigation Sidebar, which:
 *  - rendered its drawer open by default on every screen size, so on mobile
 *    the overlay covered the page until you dismissed it
 *  - listed "Admin Manage", "Add Admin" and a three-item "Users" tree whose
 *    entries pointed at routes that don't exist (/dashboard/admin/*)
 *  - gated that second tree on `userInfo?.admin`, a field no user record has,
 *    so it never rendered at all
 *  - guarded nothing: /dashboard was reachable by any visitor, signed in or
 *    not, because the check was cosmetic and lived only in the sidebar
 */
export default function DashboardLayout({ title, children }: any) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const mounted = useMounted();
  const [open, setOpen] = useState(false);

  // A real guard: non-admins are sent away rather than shown a hidden menu.
  useEffect(() => {
    if (!mounted) return;
    if (!userInfo) router.replace("/login?redirect=/dashboard");
    else if (!userInfo.isAdmin) router.replace("/");
  }, [mounted, userInfo, router]);

  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on("routeChangeComplete", close);
    return () => router.events.off("routeChangeComplete", close);
  }, [router.events]);

  const logout = () => {
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("cartItems");
    Cookies.remove("userInfo");
    router.push("/");
  };

  if (!mounted || !userInfo?.isAdmin) {
    return (
      <>
        <Head>
          <title>Dashboard | Cheesy_Kitchen</title>
        </Head>
        <div className="min-h-screen bg-oat-100" />
      </>
    );
  }

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 border-b h-[var(--header-height)] border-oat-300">
        <Link href="/" aria-label="Cheesy Kitchen — home">
          <Wordmark size="sm" />
        </Link>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="flex items-center justify-center w-10 h-10 rounded text-espresso-700 lg:hidden"
        >
          <BiX className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>

      <div className="px-5 py-5 border-b border-oat-200">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 text-sm font-semibold text-white rounded-full bg-chilli-600 shrink-0 font-display">
            {userInfo.name?.charAt(0)?.toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate text-espresso-900">
              {userInfo.name}
            </p>
            <p className="text-xs truncate text-espresso-500">{userInfo.email}</p>
          </div>
        </div>
      </div>

      <nav aria-label="Dashboard" className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-0.5">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = router.pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded transition-colors ${
                    active
                      ? "bg-saffron-100 text-saffron-800"
                      : "text-espresso-700 hover:bg-oat-100"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 space-y-1 border-t border-oat-300">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors rounded text-espresso-700 hover:bg-oat-100"
        >
          <BiHome className="w-5 h-5 shrink-0" aria-hidden="true" />
          Back to the site
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex items-center w-full gap-3 px-3 py-2.5 text-sm font-medium transition-colors rounded text-danger hover:bg-danger-soft"
        >
          <BiLogOutCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>{title ? `${title} | Dashboard` : "Dashboard"} | Cheesy_Kitchen</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-oat-100">
        {/* Desktop sidebar */}
        <aside className="fixed inset-y-0 left-0 z-30 hidden bg-white border-r w-72 border-oat-300 lg:block">
          {sidebar}
        </aside>

        {/* Mobile drawer */}
        <div
          className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
          aria-hidden={!open}
        >
          <div
            onClick={() => setOpen(false)}
            className={`absolute inset-0 transition-opacity duration-200 bg-espresso-950/60 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Dashboard menu"
            className={`absolute inset-y-0 left-0 w-[min(18rem,85vw)] bg-white shadow-popover transition-transform duration-300 ease-out ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {sidebar}
          </div>
        </div>

        <div className="lg:pl-72">
          {/* Mobile top bar */}
          <div className="sticky top-0 z-20 flex items-center gap-3 px-4 bg-white border-b h-14 border-oat-300 lg:hidden">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex items-center justify-center w-10 h-10 rounded text-espresso-800"
            >
              <BiMenu className="w-6 h-6" aria-hidden="true" />
            </button>
            <span className="text-sm font-semibold text-espresso-900">{title}</span>
          </div>

          <main className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            {title && <h1 className="mb-8">{title}</h1>}
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
