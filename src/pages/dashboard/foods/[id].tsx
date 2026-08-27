import DashboardLayout from "components/dashboard/DashboardLayout";
import FoodForm from "components/dashboard/FoodForm";
import Link from "next/link";
import foodRepo from "repositories/foodRepo";

export default function EditFoodPage({ food }: any) {
  return (
    <DashboardLayout title={`Edit ${food.name}`}>
      <p className="max-w-prose mb-8 -mt-4 text-espresso-500">
        Changes go live on{" "}
        <Link href={`/foods/${food.slug}`} className="link">
          the dish page
        </Link>{" "}
        as soon as you save.
      </p>
      <FoodForm food={food} mode="edit" />
    </DashboardLayout>
  );
}

export async function getServerSideProps({ params }: any) {
  const food = await foodRepo.getById(params.id);
  if (!food) return { notFound: true };
  return { props: { food } };
}
