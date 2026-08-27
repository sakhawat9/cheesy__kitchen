import foodRepo from "../../../repositories/foodRepo";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const food = await foodRepo.getById(req.query.id);
  // The old handler sent Mongoose's `null` with a 200, so the client-side
  // stock check read `countInStock` off null and threw.
  if (!food) return res.status(404).json({ message: "Dish not found" });

  return res.status(200).json(food);
}
