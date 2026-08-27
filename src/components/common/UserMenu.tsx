import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useContext } from "react";
import {
  BiCog,
  BiLogOutCircle,
  BiPlusCircle,
  BiReceipt,
  BiSolidDashboard,
} from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { MdOutlineRateReview, MdOutlineShoppingBasket } from "react-icons/md";
import { Store } from "../../utils/Store";

/**
 * Account dropdown.
 *
 * The old file was 476 lines, of which ~300 were eight unused decorative SVG
 * icon components copy-pasted from the Headless UI docs example. Every entry
 * also rendered `active ? <Icon/> : <Icon/>` — the same icon in both arms —
 * and wrapped a <button> inside a <Link>, which is invalid HTML and meant the
 * keyboard focus order ran through each entry twice.
 */
export default function UserMenu({ userInfo }: any) {
  const router = useRouter();
  const { dispatch } = useContext(Store);

  const logout = () => {
    dispatch({ type: "USER_LOGOUT" });
    // The old handler called a bare `Cookies.remove()` with no name, which is
    // a no-op, after removing the two that mattered.
    Cookies.remove("cartItems");
    Cookies.remove("userInfo");
    Cookies.remove("shippingAddress");
    router.push("/");
  };

  const items = [
    ...(userInfo?.isAdmin
      ? [
          { href: "/dashboard", label: "Dashboard", icon: BiSolidDashboard },
          { href: "/dashboard/foods/addFoods", label: "Add a dish", icon: BiPlusCircle },
          { href: "/dashboard/foods/managefoods", label: "Manage menu", icon: FiEdit },
          { href: "/dashboard/allOrder", label: "All orders", icon: BiReceipt },
        ]
      : []),
    { href: "/cartFood", label: "My basket", icon: MdOutlineShoppingBasket },
    { href: "/review-form", label: "Leave a review", icon: MdOutlineRateReview },
    { href: "/profile", label: "Account settings", icon: BiCog },
  ];

  const initial = userInfo?.name?.trim()?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <Menu as="div" className="relative inline-block ml-1 text-left">
      <MenuButton className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium transition-colors rounded-full text-charcoal-800 hover:bg-cream-100">
        {/* An initial avatar rather than next/image on `userInfo.img`: that
            field is a remote URL from an arbitrary host, and the old markup
            crashed the header outright when it was empty. */}
        <span className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-white rounded-full bg-ember-600 shrink-0">
          {initial}
        </span>
        <span className="hidden max-w-[8rem] truncate sm:inline">{userInfo?.name}</span>
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white border rounded-card border-cream-300 shadow-popover focus:outline-none">
          <div className="px-4 py-3 border-b border-cream-200">
            <p className="text-sm font-semibold truncate text-charcoal-900">
              {userInfo?.name}
            </p>
            <p className="text-xs truncate text-charcoal-500">{userInfo?.email}</p>
          </div>

          <div className="p-1.5">
            {items.map(({ href, label, icon: Icon }) => (
              <MenuItem key={href}>
                <Link
                  href={href}
                  className="flex items-center w-full gap-2.5 px-2.5 py-2 text-sm rounded text-charcoal-700 data-[focus]:bg-cream-100 data-[focus]:text-charcoal-900"
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {label}
                </Link>
              </MenuItem>
            ))}
          </div>

          <div className="p-1.5 border-t border-cream-200">
            <MenuItem>
              <button
                type="button"
                onClick={logout}
                className="flex items-center w-full gap-2.5 px-2.5 py-2 text-sm rounded text-danger data-[focus]:bg-danger-soft"
              >
                <BiLogOutCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                Log out
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
