import bcrypt from "bcryptjs";
import nc from "next-connect";
import User from "../../../models/User";
import { signToken } from "../../../utils/auth";
import db from "../../../utils/db";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
    img: req.body.img,
    facebook: req.body.facebook,
    linkedIn: req.body.linkedIn,
    twitter: req.body.twitter,
    user: req.body.user,
    instructor: req.body.instructor,
  });

  const user = await newUser.save();
  await db.disconnect();

  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    img: user.img,
    facebook: user.facebook,
    linkedIn: user.linkedIn,
    twitter: user.twitter,
    user: user.user,
    instructor: user.instructor,
  });
});
export default handler;
