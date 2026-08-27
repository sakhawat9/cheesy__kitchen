import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

/**
 * Description / details tabs for a dish.
 *
 * Replaces the react-tabs implementation (and its unstyled default stylesheet,
 * the only thing that dependency was used for) with Headless UI, which is
 * already in the project and handles the roving tabindex and aria-controls
 * wiring properly.
 *
 * The old "Reviews" tab rendered a <Reviews /> component that fetched every
 * review in the database, not the ones for this dish — so each dish showed
 * identical, unrelated reviews. Until reviews are associated with a dish, the
 * second tab shows the kitchen notes that are genuinely dish-specific.
 */
export default function FoodTabs({ food }: any) {
  const tabs = [
    { label: "How it's made", content: food.description },
    {
      label: "Ordering & delivery",
      content:
        "Everything is cooked to order, so allow a little longer at peak times — we'd rather it arrive right than early. Delivery is free anywhere in Dhaka on every order, with no minimum spend. If something arrives wrong or cold, tell us and we'll remake it or refund it, no argument.",
    },
  ];

  return (
    <section className="section-sm section-bg">
      <div className="container">
        <div className="mx-auto max-w-prose">
          <TabGroup>
            <TabList className="flex gap-1 mb-6 border-b border-cream-300">
              {tabs.map((tab) => (
                <Tab
                  key={tab.label}
                  className="px-4 py-3 -mb-px text-sm font-semibold transition-colors border-b-2 border-transparent outline-none text-charcoal-500 hover:text-charcoal-900 data-[selected]:border-ember-600 data-[selected]:text-ember-700"
                >
                  {tab.label}
                </Tab>
              ))}
            </TabList>

            <TabPanels>
              {tabs.map((tab) => (
                <TabPanel
                  key={tab.label}
                  className="leading-relaxed outline-none text-charcoal-600"
                >
                  {tab.content}
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </section>
  );
}
