import bcrypt from "bcryptjs";
import userRepo from "../../../repositories/userRepo";
import { publicUser, signToken } from "../../../utils/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, password } = req.body ?? {};

  if (!name?.trim() || !email?.trim() || !password) {
    return res
      .status(400)
      .json({ message: "Name, email and password are all required" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Passwords must be at least 6 characters" });
  }

  const normalisedEmail = String(email).trim().toLowerCase();

  // The old handler had no duplicate check and relied on the unique index
  // throwing, which surfaced to the client as an unhandled 500.
  const existing = await userRepo.getByEmail(normalisedEmail);
  if (existing) {
    return res
      .status(409)
      .json({ message: "An account already exists with that email address" });
  }

  const user = await userRepo.create({
    name: name.trim(),
    email: normalisedEmail,
    password: bcrypt.hashSync(password),
    // `isAdmin` is deliberately not taken from the request body: the old
    // handler spread client-controlled fields (`user`, `instructor`) straight
    // onto the record.
    isAdmin: false,
    user: true,
  });

  return res.status(201).json({ token: signToken(user), ...publicUser(user) });
}
