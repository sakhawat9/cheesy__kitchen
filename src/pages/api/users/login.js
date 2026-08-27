import bcrypt from "bcryptjs";
import userRepo from "../../../repositories/userRepo";
import { publicUser, signToken } from "../../../utils/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await userRepo.getByEmail(String(email).trim().toLowerCase());

  if (!user || !bcrypt.compareSync(password, user.password)) {
    // Deliberately the same message for both cases, so the endpoint can't be
    // used to test which email addresses have accounts.
    return res.status(401).json({ message: "Invalid email or password" });
  }

  return res.status(200).json({ token: signToken(user), ...publicUser(user) });
}
