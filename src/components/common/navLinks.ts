// Single source of truth for primary navigation, shared by the desktop nav and
// the mobile drawer. Previously the nav was written out as literal JSX in
// Header.tsx and again, differently, in MobileMenu.tsx — the mobile version
// linked to /menu, /gallery and /review, none of which are routes, plus two
// href="#" entries duplicating the contact details already in the top bar.
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/foods", label: "Menu" },
  { href: "/category", label: "Categories" },
  { href: "/aboutUs", label: "Our Kitchen" },
  { href: "/contact", label: "Contact" },
];
