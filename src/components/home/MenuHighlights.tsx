import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import FoodGrid from "../menu/FoodGrid";
import SectionHeading from "../ui/SectionHeading";

/**
 * The latest dishes on the menu.
 *
 * Replaces LatestFoods, which rendered the same six dishes the featured
 * section immediately below it also rendered — so the homepage showed most of
 * the menu twice in a row. This takes the newest six and the featured band
 * below deliberately excludes anything shown here.
 */
export default function MenuHighlights({ foods = [] }: any) {
  if (foods.length === 0) return null;

  return (
    <section className="section section-bg">
      <div className="container">
        <SectionHeading
          eyebrow="Fresh on the menu"
          title="Newest from the kitchen"
          description="What the chefs have added most recently, across every category."
        />

        <FoodGrid foods={foods.slice(0, 6)} />

        <div className="flex justify-center mt-12">
          <Link href="/foods" className="btn btn-outline btn-lg">
            See the full menu
            <MdArrowForward className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
