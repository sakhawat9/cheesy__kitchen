import FoodCard from "./FoodCard";

/** Consistent responsive dish grid: 1 / 2 / 3 columns. */
export default function FoodGrid({ foods = [], className = "" }: any) {
  return (
    <div
      className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 ${className}`}
    >
      {foods.map((food: any, index: number) => (
        <FoodCard key={food._id} food={food} priority={index < 3} />
      ))}
    </div>
  );
}

/** Placeholder grid matching FoodCard's shape, for loading states. */
export function FoodGridSkeleton({ count = 6 }: any) {
  return (
    <div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6"
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="overflow-hidden border rounded-card border-cream-300">
          <div className="rounded-none skeleton aspect-[4/3]" />
          <div className="p-5 space-y-3">
            <div className="w-1/3 h-3 skeleton" />
            <div className="w-3/4 h-4 skeleton" />
            <div className="w-full h-3 skeleton" />
            <div className="w-1/4 h-5 skeleton" />
          </div>
        </div>
      ))}
    </div>
  );
}
