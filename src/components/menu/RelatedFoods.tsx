import { categoryLabel } from "../../utils/format";
import SectionIntro from "../ui/SectionIntro";
import DishGrid from "./DishGrid";

/**
 * "More like this" band on the dish page.
 *
 * The row is always filled to three: with a menu this short a category can
 * hold a single other dish, and one lone card floating in a three-column grid
 * reads as a rendering fault rather than a deliberate short list. Same-category
 * dishes come first, then the rest of the menu.
 */
export default function RelatedFoods({ foods = [], current }: any) {
  const others = foods.filter((food: any) => food._id !== current._id);
  const sameCategory = others.filter(
    (food: any) => food.category === current.category,
  );
  const rest = others.filter((food: any) => food.category !== current.category);

  const related = [...sameCategory, ...rest].slice(0, 3);
  if (related.length === 0) return null;

  const allSameCategory = related.length <= sameCategory.length;

  return (
    <section className="section surface-cream">
      <div className="container">
        <SectionIntro
          label="Keep going"
          title={
            allSameCategory
              ? `More ${categoryLabel(current.category).toLowerCase()}`
              : "You might also like"
          }
          align="center"
          className="mb-14"
        />
        <DishGrid foods={related} />
      </div>
    </section>
  );
}
