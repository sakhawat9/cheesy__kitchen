import reviewRepo from "../../../repositories/reviewRepo";
import { requireAuth } from "../../../utils/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  // The old endpoint was unauthenticated and took the reviewer's name, email
  // and avatar straight from the request body, so anyone could post a review
  // as anyone. Identity now comes from the token.
  const auth = requireAuth(req, res);
  if (!auth) return undefined;

  const { description } = req.body ?? {};
  if (!description?.trim()) {
    return res.status(400).json({ message: "A review needs some text" });
  }

  const review = await reviewRepo.create({
    name: auth.name,
    email: auth.email,
    description: description.trim().slice(0, 1000),
    img: req.body?.img ?? "",
  });

  // The old handler signed a JWT from the *review* document and returned it,
  // which the client then dispatched as USER_LOGIN.
  return res.status(201).json(review);
}
