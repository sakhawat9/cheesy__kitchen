import foodRepo from "../../../../repositories/foodRepo";
import { requireAdmin } from "../../../../utils/auth";

/** Create a dish. Replaces /api/addFood/addFood, which had no auth at all. */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const auth = requireAdmin(req, res);
  if (!auth) return undefined;

  const { name, slug, shortDesc, category, price, description, image } =
    req.body ?? {};

  if (!name?.trim() || !slug?.trim() || !category?.trim() || !image?.trim()) {
    return res
      .status(400)
      .json({ message: "Name, slug, category and image are all required" });
  }

  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice) || numericPrice < 0) {
    return res.status(400).json({ message: "Price must be a positive number" });
  }

  const normalisedSlug = slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const clash = await foodRepo.getBySlug(normalisedSlug);
  if (clash) {
    return res
      .status(409)
      .json({ message: "A dish with that slug already exists" });
  }

  const food = await foodRepo.create({
    name: name.trim(),
    slug: normalisedSlug,
    shortDesc: shortDesc?.trim() ?? "",
    description: description?.trim() ?? "",
    category: category.trim(),
    // The old create handler read `req.body.img` for the image but echoed
    // `foods.img` back, a field the schema doesn't have, so the response
    // always reported the image as undefined.
    image: image.trim(),
    price: numericPrice,
  });

  return res.status(201).json(food);
}
