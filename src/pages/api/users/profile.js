import bcrypt from "bcryptjs";
import userRepo from "../../../repositories/userRepo";
import { publicUser, requireAuth, signToken } from "../../../utils/auth";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", "PUT");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const auth = requireAuth(req, res);
  if (!auth) return undefined;

  const { name, email, password, facebook, linkedIn, twitter } = req.body ?? {};

  if (!name?.trim() || !email?.trim()) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const normalisedEmail = String(email).trim().toLowerCase();

  // Changing to an address another account already uses used to silently
  // violate the unique index and 500.
  const clash = await userRepo.getByEmail(normalisedEmail);
  if (clash && clash._id !== auth._id) {
    return res
      .status(409)
      .json({ message: "That email address is already in use" });
  }

  const patch = {
    name: name.trim(),
    email: normalisedEmail,
    facebook: facebook ?? "",
    linkedIn: linkedIn ?? "",
    twitter: twitter ?? "",
  };

  // Only hash and store a password when one was sent. The old handler
  // reassigned every field unconditionally, so omitting `img` from the request
  // wiped the user's avatar.
  if (password) {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Passwords must be at least 6 characters" });
    }
    patch.password = bcrypt.hashSync(password);
  }

  const user = await userRepo.updateById(auth._id, patch);
  if (!user) return res.status(404).json({ message: "Account not found" });

  return res.status(200).json({ token: signToken(user), ...publicUser(user) });
}
