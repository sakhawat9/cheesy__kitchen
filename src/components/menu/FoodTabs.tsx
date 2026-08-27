import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

/**
 * Description / details tabs for a dish, on the dark ground so the band reads
 * as a break between the ordering panel above and the related dishes below.
 *
 * The old "Reviews" tab fetched every review in the database rather than the
 * ones for this dish, so each dish showed identical, unrelated reviews. Until
 * reviews are associated with a dish, the second tab shows the ordering notes
 * that are genuinely dish-agnostic and useful here.
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
    <section className="section-sm surface-dark on-dark">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <TabGroup>
            <TabList className="flex flex-wrap gap-8 mb-8 border-b border-white/10">
              {tabs.map((tab) => (
                <Tab
                  key={tab.label}
                  className="pb-4 -mb-px text-label font-medium uppercase transition-colors border-b-2 border-transparent outline-none text-oat-400 hover:text-oat-100 data-[selected]:border-saffron-500 data-[selected]:text-saffron-400"
                >
                  {tab.label}
                </Tab>
              ))}
            </TabList>

            <TabPanels>
              {tabs.map((tab) => (
                <TabPanel
                  key={tab.label}
                  className="text-lg leading-relaxed outline-none text-oat-300 animate-rise"
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
