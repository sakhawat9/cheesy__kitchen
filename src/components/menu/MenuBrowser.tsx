import { useMemo, useState } from "react";
import { MdOutlineRestaurantMenu, MdSearch } from "react-icons/md";
import { categoryLabel } from "../../utils/format";
import EmptyState from "../ui/EmptyState";
import Pagination from "../ui/Pagination";
import { CATEGORIES } from "./categories";
import FoodGrid from "./FoodGrid";

const PER_PAGE = 6;

const SORTS = [
  { value: "featured", label: "Featured first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Highest rated" },
  { value: "name", label: "Name: A to Z" },
];

/**
 * The menu listing: search, category filter, sort and pagination in one place.
 *
 * The old /foods page had none of this — it sliced the array six at a time and
 * rendered a pagination bar of `<a href="#">` links, with no way to filter or
 * sort, while six hand-written category pages each duplicated a filtered copy
 * of the same list.
 *
 * Filtering is client-side because the whole menu is a handful of records; it
 * keeps the interaction instant and avoids a round trip per keystroke.
 */
export default function MenuBrowser({ foods = [], initialCategory = "" }: any) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  // Only offer categories that actually have dishes behind them.
  const availableCategories = useMemo(
    () =>
      CATEGORIES.filter((entry) =>
        foods.some((food: any) => food.category === entry.slug),
      ),
    [foods],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    let result = foods.filter((food: any) => {
      const matchesCategory = !category || food.category === category;
      const matchesQuery =
        !needle ||
        food.name?.toLowerCase().includes(needle) ||
        food.shortDesc?.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });

    result = [...result].sort((a: any, b: any) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return (b.rating ?? 0) - (a.rating ?? 0);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return Number(b.prichard ?? false) - Number(a.prichard ?? false);
      }
    });

    return result;
  }, [foods, query, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  // Clamp rather than store an out-of-range page: changing the filter used to
  // be able to leave you on page 4 of a 1-page result, showing nothing.
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  const resetFilters = () => {
    setQuery("");
    setCategory("");
    setSort("featured");
    setPage(1);
  };

  const hasFilters = Boolean(query.trim() || category || sort !== "featured");

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col gap-4 mb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="w-full sm:w-64">
            <label htmlFor="menu-search" className="label">
              Search the menu
            </label>
            <div className="relative">
              <input
                id="menu-search"
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="Burger, pasta, chicken…"
                className="input py-2.5 pl-10 text-sm"
              />
              <MdSearch
                className="absolute w-5 h-5 -translate-y-1/2 pointer-events-none left-3 top-1/2 text-charcoal-400"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="w-full sm:w-48">
            <label htmlFor="menu-category" className="label">
              Category
            </label>
            <select
              id="menu-category"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setPage(1);
              }}
              className="select py-2.5 text-sm"
            >
              <option value="">All categories</option>
              {availableCategories.map((entry) => (
                <option key={entry.slug} value={entry.slug}>
                  {entry.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-52">
            <label htmlFor="menu-sort" className="label">
              Sort by
            </label>
            <select
              id="menu-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="select py-2.5 text-sm"
            >
              {SORTS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result count, announced so filtering is perceivable without sight. */}
        <p className="text-sm text-charcoal-500" role="status" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "dish" : "dishes"}
          {category ? ` in ${categoryLabel(category)}` : ""}
          {query.trim() ? ` matching “${query.trim()}”` : ""}
        </p>
      </div>

      {/* The cards below are <h3>s. Without a heading at this level the
          document outline jumps straight from the page <h1> to <h3>. */}
      <h2 className="sr-only">Dishes</h2>

      {visible.length === 0 ? (
        <EmptyState
          icon={MdOutlineRestaurantMenu}
          title="Nothing on the menu matches that"
          description="Try a different search term, or clear the filters to see everything the kitchen is cooking."
          action={hasFilters ? { label: "Clear filters", onClick: resetFilters } : undefined}
          secondaryAction={{ label: "Back to the full menu", href: "/foods" }}
        />
      ) : (
        <>
          <FoodGrid foods={visible} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(next: number) => {
              setPage(next);
              // Jump back to the top of the grid rather than leaving the reader
              // stranded mid-list after the content swaps underneath them.
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </>
      )}
    </>
  );
}
