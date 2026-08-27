import DishCard from "./DishCard";

/** Consistent responsive dish grid: 1 / 2 / 3 columns. */
export default function DishGrid({ foods = [], className = "" }: any) {
  return (
    <div
      className={`grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {foods.map((food: any, index: number) => (
        <DishCard key={food._id} food={food} priority={index < 3} />
      ))}
    </div>
  );
}

/** Placeholder grid matching DishCard's shape, for loading states. */
export function DishGridSkeleton({ count = 6 }: any) {
  return (
    <div
      className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>
          <div className="mb-5 skeleton aspect-[4/3] rounded-panel" />
          <div className="space-y-3">
            <div className="w-1/4 h-3 skeleton" />
            <div className="w-3/4 h-5 skeleton" />
            <div className="w-full h-3 skeleton" />
          </div>
        </div>
      ))}
    </div>
  );
}
