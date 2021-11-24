import bcrypt from "bcryptjs";
import nc from "next-connect";
import User from "../../../models/User";
import { isAuth, signToken } from "../../../utils/auth";
import db from "../../../utils/db";

const handler = nc();
handler.use(isAuth);

handler.put(async (req, res) => {
  await db.connect();
  const user = await User.findById(req.user._id);
  user.name = req.body.name;
  user.email = req.body.email;
  user.img = req.body.img;
  user.facebook = req.body.facebook;
  user.linkedIn = req.body.linkedIn;
  user.twitter = req.body.twitter;
  user.password = req.body.password
    ? bcrypt.hashSync(req.body.password)
    : user.password;
  await user.save();
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
