import foodRepo from "../../../../../repositories/foodRepo";
import { requireAdmin } from "../../../../../utils/auth";

export default async function handler(req, res) {
  const auth = requireAdmin(req, res);
  if (!auth) return undefined;

  const { id } = req.query;

  if (req.method === "GET") {
    const food = await foodRepo.getById(id);
    if (!food) return res.status(404).json({ message: "Dish not found" });
    return res.status(200).json(food);
  }

  if (req.method === "PUT") {
    const existing = await foodRepo.getById(id);
    if (!existing) return res.status(404).json({ message: "Dish not found" });

    const { name, slug, shortDesc, category, price, description, image, prichard } =
      req.body ?? {};

    // The old PUT assigned `foods.title`, `foods.categories`, `foods.level`,
    // `foods.videoUrl`, `foods.img` and `foods.desc` — none of which exist on
    // the Food schema. Mongoose silently dropped every one of them, so editing
    // a dish appeared to succeed and changed nothing.
    const patch = {};
    if (name !== undefined) patch.name = String(name).trim();
    if (slug !== undefined) patch.slug = String(slug).trim();
    if (shortDesc !== undefined) patch.shortDesc = String(shortDesc).trim();
    if (description !== undefined) patch.description = String(description).trim();
    if (category !== undefined) patch.category = String(category).trim();
    if (image !== undefined) patch.image = String(image).trim();
    if (prichard !== undefined) patch.prichard = Boolean(prichard);

    if (price !== undefined) {
      const numericPrice = Number(price);
      if (!Number.isFinite(numericPrice) || numericPrice < 0) {
        return res.status(400).json({ message: "Price must be a positive number" });
      }
      patch.price = numericPrice;
    }

    const food = await foodRepo.updateById(id, patch);
    return res.status(200).json(food);
  }

  if (req.method === "DELETE") {
    // `await foods.remove()` was removed in Mongoose 7, so the old delete
    // handler threw for every request.
    const removed = await foodRepo.removeById(id);
    if (!removed) return res.status(404).json({ message: "Dish not found" });
    return res.status(200).json({ message: "Dish deleted" });
  }

  res.setHeader("Allow", "GET, PUT, DELETE");
  return res.status(405).json({ message: "Method not allowed" });
}
