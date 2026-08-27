import DashboardLayout from "components/dashboard/DashboardLayout";
import FoodForm from "components/dashboard/FoodForm";

export default function AddFoodPage() {
  return (
    <DashboardLayout title="Add a dish">
      <p className="max-w-prose mb-8 -mt-4 text-charcoal-500">
        Everything here shows on the public menu as soon as it&apos;s saved.
      </p>
      <FoodForm mode="create" />
    </DashboardLayout>
  );
}
