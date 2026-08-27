import orderRepo from "../../../repositories/orderRepo";
import { requireAuth } from "../../../utils/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Previously unauthenticated: the client sent an Authorization header that
  // the handler never checked, and spread the whole request body into a new
  // Order — including the `userInfo` the caller chose to claim.
  const auth = requireAuth(req, res);
  if (!auth) return undefined;

  const { phone, address, paymentInfo, cartItems } = req.body ?? {};

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ message: "An order needs at least one item" });
  }
  if (!phone?.trim() || !address?.trim()) {
    return res
      .status(400)
      .json({ message: "A delivery address and phone number are required" });
  }

  const order = await orderRepo.create({
    phone: phone.trim(),
    address: address.trim(),
    paymentInfo: {
      brand: paymentInfo?.brand ?? "",
      country: paymentInfo?.country ?? "",
      last4: paymentInfo?.last4 ?? "",
    },
    userInfo: {
      _id: auth._id,
      name: auth.name,
      email: auth.email,
      isAdmin: Boolean(auth.isAdmin),
    },
    // Store only what an order needs, not the entire dish record the client
    // happened to be holding.
    cartItems: cartItems.map((item) => ({
      _id: item._id,
      name: item.name,
      slug: item.slug,
      image: item.image,
      price: item.price,
      quantity: item.quantity ?? 1,
      category: item.category,
    })),
    total: cartItems.reduce(
      (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
      0,
    ),
  });

  // The old handler never called db.disconnect(), leaking a connection per order.
  return res.status(201).json(order);
}
