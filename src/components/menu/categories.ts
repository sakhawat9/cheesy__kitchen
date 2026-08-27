/**
 * The menu's category taxonomy.
 *
 * Derived from the categories dishes are actually filed under. The old
 * CategoriesData listed six tiles — including "Biryani" and "Chicken Chap",
 * which no dish on the menu belonged to, so two of the six tiles led to an
 * empty page. It also spelled the burger category "barger" in the tile and
 * "bargar" on the dishes, so that tile matched nothing either.
 *
 * Tile artwork is not hardcoded here: CategoryShowcase picks a real photo from
 * the dishes in each category, so the tiles can't drift away from the menu.
 */
export interface Category {
  slug: string;
  name: string;
  blurb: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "burgers",
    name: "Burgers",
    blurb: "Smashed thin, cheese melted on the flat top, brioche toasted in the beef fat.",
  },
  {
    slug: "pizza",
    name: "Pizza",
    blurb: "A 48-hour dough, blistered fast and hot. Three toppings, never more.",
  },
  {
    slug: "chicken",
    name: "Chicken",
    blurb: "Brined overnight, roasted or grilled over coals until the skin shatters.",
  },
  {
    slug: "pasta",
    name: "Pasta",
    blurb: "Sauces built in the pan from the pasta water, glossy and clinging.",
  },
];

export function categoryBySlug(slug?: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}
