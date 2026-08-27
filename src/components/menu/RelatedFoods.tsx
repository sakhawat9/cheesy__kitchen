import { categoryLabel } from "../../utils/format";
import SectionHeading from "../ui/SectionHeading";
import FoodGrid from "./FoodGrid";

/**
 * "More like this" band on the dish page. The old detail page ended abruptly
 * after the tabs with no route onward except the browser's back button.
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

  // Only claim the row is all one category when it actually is.
  const allSameCategory = related.length <= sameCategory.length;

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Keep going"
          title={
            allSameCategory
              ? `More ${categoryLabel(current.category).toLowerCase()}`
              : "You might also like"
          }
        />
        <FoodGrid foods={related} />
      </div>
    </section>
  );
}
