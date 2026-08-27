import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CATEGORIES } from "../menu/categories";
import { Store } from "../../utils/Store";
import Button from "../ui/Button";
import Field, { inputClass } from "../ui/Field";

/**
 * Create / edit form for a dish, shared by both admin screens.
 *
 * The old AddNewFood posted to an unauthenticated endpoint, offered a free-text
 * category input (which is how "bargar" and "barger" came to coexist), and
 * generated no slug — so a dish saved without one produced a detail page at
 * /foods/undefined.
 */
export default function FoodForm({ food, mode = "create" }: any) {
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: food?.name ?? "",
      slug: food?.slug ?? "",
      category: food?.category ?? CATEGORIES[0].slug,
      price: food?.price ?? "",
      image: food?.image ?? "",
      shortDesc: food?.shortDesc ?? "",
      description: food?.description ?? "",
      prichard: food?.prichard ?? false,
    },
  });

  const image = watch("image");

  // Derive the slug from the name unless the admin has typed their own.
  const syncSlug = (event: React.FocusEvent<HTMLInputElement>) => {
    if (mode !== "create" || watch("slug")) return;
    setValue(
      "slug",
      event.target.value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    );
  };

  const onSubmit = async (values: any) => {
    const headers = { authorization: `Bearer ${userInfo?.token}` };

    try {
      if (mode === "edit") {
        await axios.put(`/api/admin/foods/${food._id}`, values, { headers });
        toast.success(`“${values.name}” updated.`);
      } else {
        await axios.post("/api/admin/foods", values, { headers });
        toast.success(`“${values.name}” added to the menu.`);
      }
      router.push("/dashboard/foods/managefoods");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "We couldn't save that dish. Please try again.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-3xl">
      <div className="grid gap-x-5 sm:grid-cols-2">
        <Field label="Dish name" error={errors.name?.message as string} required>
          {(id, describedBy, invalid) => (
            <input
              id={id}
              type="text"
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={inputClass(invalid)}
              {...register("name", { required: "Please name the dish." })}
              onBlur={syncSlug}
            />
          )}
        </Field>

        <Field
          label="URL slug"
          error={errors.slug?.message as string}
          hint="Appears in the address bar, e.g. /foods/double-smash-burger"
          required
        >
          {(id, describedBy, invalid) => (
            <input
              id={id}
              type="text"
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={inputClass(invalid)}
              {...register("slug", {
                required: "A slug is required.",
                pattern: {
                  value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                  message: "Use lowercase letters, numbers and hyphens only.",
                },
              })}
            />
          )}
        </Field>
      </div>

      <div className="grid gap-x-5 sm:grid-cols-2">
        <Field label="Category" error={errors.category?.message as string} required>
          {(id, describedBy, invalid) => (
            <select
              id={id}
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className="select"
              {...register("category", { required: "Pick a category." })}
            >
              {CATEGORIES.map((entry) => (
                <option key={entry.slug} value={entry.slug}>
                  {entry.name}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field label="Price" error={errors.price?.message as string} required>
          {(id, describedBy, invalid) => (
            <input
              id={id}
              type="number"
              min="0"
              step="1"
              inputMode="decimal"
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={inputClass(invalid)}
              {...register("price", {
                required: "Please set a price.",
                min: { value: 0, message: "Price can't be negative." },
              })}
            />
          )}
        </Field>
      </div>

      <Field
        label="Photo URL"
        error={errors.image?.message as string}
        hint="A direct link to the dish photograph."
        required
      >
        {(id, describedBy, invalid) => (
          <input
            id={id}
            type="url"
            aria-describedby={describedBy}
            aria-invalid={invalid}
            className={inputClass(invalid)}
            {...register("image", { required: "A photo is required." })}
          />
        )}
      </Field>

      {image && (
        // A live preview, so a broken URL is caught before the dish is saved
        // and the card on the menu renders a grey placeholder.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          className="object-cover w-40 h-32 mb-5 rounded-card bg-cream-100"
          onError={(event) => {
            (event.target as HTMLImageElement).style.display = "none";
          }}
        />
      )}

      <Field
        label="Short description"
        error={errors.shortDesc?.message as string}
        hint="One sentence — this is what shows on the menu card."
        required
      >
        {(id, describedBy, invalid) => (
          <textarea
            id={id}
            rows={2}
            aria-describedby={describedBy}
            aria-invalid={invalid}
            className={inputClass(invalid, "textarea")}
            {...register("shortDesc", {
              required: "Please write a short description.",
              maxLength: { value: 200, message: "Keep this under 200 characters." },
            })}
          />
        )}
      </Field>

      <Field
        label="Full description"
        error={errors.description?.message as string}
        hint="Shown on the dish page under “How it's made”."
        required
      >
        {(id, describedBy, invalid) => (
          <textarea
            id={id}
            rows={6}
            aria-describedby={describedBy}
            aria-invalid={invalid}
            className={inputClass(invalid, "textarea")}
            {...register("description", {
              required: "Please write the full description.",
            })}
          />
        )}
      </Field>

      <div className="field">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 rounded w-4 h-4 border-charcoal-300 text-ember-600 focus:ring-ember-600"
            {...register("prichard")}
          />
          <span>
            <span className="block text-sm font-medium text-charcoal-800">
              Feature this dish
            </span>
            <span className="block text-sm text-charcoal-500">
              Featured dishes appear in the homepage hero and the chef&apos;s table.
            </span>
          </span>
        </label>
      </div>

      <div className="flex flex-wrap gap-3 mt-2">
        <Button type="submit" variant="accent" size="lg" loading={isSubmitting}>
          {mode === "edit" ? "Save changes" : "Add to the menu"}
        </Button>
        <Button href="/dashboard/foods/managefoods" variant="outline" size="lg">
          Cancel
        </Button>
      </div>
    </form>
  );
}
