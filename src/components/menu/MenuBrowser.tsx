import { useMemo, useState } from "react";
import { LuLayoutGrid, LuList, LuSearch, LuUtensilsCrossed } from "react-icons/lu";
import { categoryLabel } from "../../utils/format";
import EmptyState from "../ui/EmptyState";
import Reveal from "../ui/Reveal";
import { CATEGORIES } from "./categories";
import DishGrid from "./DishGrid";
import MenuList from "./MenuList";

/**
 * The menu page's browsing surface.
 *
 * Two views. "Menu" is the default and groups every dish under its course as a
 * printed list — which is how a restaurant menu is read, and shows the whole
 * short menu at once with no paging. "Photos" switches to the card grid for
 * people who want to see the food before choosing.
 *
 * Filtering is client-side because the whole menu is a handful of records; it
 * keeps the interaction instant and avoids a round trip per keystroke.
 */
export default function MenuBrowser({ foods = [], initialCategory = "" }: any) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [view, setView] = useState<"list" | "grid">("list");

  const availableCategories = useMemo(
    () =>
      CATEGORIES.filter((entry) =>
        foods.some((food: any) => food.category === entry.slug),
      ),
    [foods],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return foods.filter((food: any) => {
      const matchesCategory = !category || food.category === category;
      const matchesQuery =
        !needle ||
        food.name?.toLowerCase().includes(needle) ||
        food.shortDesc?.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [foods, query, category]);

  // Group the filtered dishes under their course for the list view.
  const grouped = useMemo(
    () =>
      availableCategories
        .map((entry) => ({
          ...entry,
          items: filtered.filter((food: any) => food.category === entry.slug),
        }))
        .filter((entry) => entry.items.length > 0),
    [availableCategories, filtered],
  );

  const resetFilters = () => {
    setQuery("");
    setCategory("");
  };

  const hasFilters = Boolean(query.trim() || category);

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col gap-6 mb-14">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Course filter */}
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={!category}
              onClick={() => setCategory("")}
              label="Everything"
            />
            {availableCategories.map((entry) => (
              <FilterChip
                key={entry.slug}
                active={category === entry.slug}
                onClick={() => setCategory(entry.slug)}
                label={entry.name}
              />
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative sm:w-64">
              <label htmlFor="menu-search" className="sr-only">
                Search the menu
              </label>
              <input
                id="menu-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the menu"
                className="py-2.5 pl-11 text-sm input"
              />
              <LuSearch
                className="absolute w-4 h-4 -translate-y-1/2 pointer-events-none left-4 top-1/2 text-espresso-400"
                aria-hidden="true"
              />
            </div>

            {/* View toggle */}
            <div
              role="group"
              aria-label="Menu view"
              className="flex self-start p-1 rounded-full bg-oat-200 shrink-0"
            >
              <ViewButton
                active={view === "list"}
                onClick={() => setView("list")}
                icon={LuList}
                label="Menu list"
              />
              <ViewButton
                active={view === "grid"}
                onClick={() => setView("grid")}
                icon={LuLayoutGrid}
                label="Photo grid"
              />
            </div>
          </div>
        </div>

        <p
          className="text-sm text-espresso-500"
          role="status"
          aria-live="polite"
        >
          {filtered.length} {filtered.length === 1 ? "dish" : "dishes"}
          {category ? ` in ${categoryLabel(category)}` : " on the menu"}
          {query.trim() ? ` matching “${query.trim()}”` : ""}
        </p>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={LuUtensilsCrossed}
          title="Nothing on the menu matches that"
          description="Try a different search, or clear the filters to see everything the kitchen is cooking."
          action={
            hasFilters ? { label: "Clear filters", onClick: resetFilters } : undefined
          }
          secondaryAction={{ label: "Back to the full menu", href: "/foods" }}
        />
      ) : view === "grid" ? (
        <DishGrid foods={filtered} />
      ) : (
        <div className="space-y-16">
          {grouped.map((group) => (
            <Reveal key={group.slug} as="section" aria-labelledby={`course-${group.slug}`}>
              <div className="flex items-baseline gap-5 mb-8">
                <h2 id={`course-${group.slug}`} className="text-h2 shrink-0">
                  {group.name}
                </h2>
                <span
                  aria-hidden="true"
                  className="flex-1 h-px bg-espresso-200"
                />
                <span className="text-sm shrink-0 text-espresso-400">
                  {group.items.length}
                </span>
              </div>

              <MenuList items={group.items} className="max-w-3xl" />
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}

function FilterChip({ active, onClick, label }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`px-5 py-2 text-label font-medium uppercase rounded-full border transition-all duration-300 ${
        active
          ? "bg-espresso-900 border-espresso-900 text-oat-50"
          : "border-espresso-200 text-espresso-600 hover:border-espresso-900 hover:text-espresso-900"
      }`}
    >
      {label}
    </button>
  );
}

function ViewButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      title={label}
      className={`flex items-center justify-center w-10 h-9 rounded-full transition-colors ${
        active
          ? "bg-oat-50 text-espresso-900 shadow-subtle"
          : "text-espresso-500 hover:text-espresso-900"
      }`}
    >
      <Icon className="w-4 h-4" aria-hidden="true" />
    </button>
  );
}
