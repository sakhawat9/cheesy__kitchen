import nc from "next-connect";
import Comment from "../../../models/Comment";
import { signToken } from "../../../utils/auth";
import db from "../../../utils/db";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const newUser = new Comment({
    name: req.body.name,
    email: req.body.email,
    img: req.body.img,
  });

  const user = await newUser.save();
  await db.disconnect();

  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    img: user.img,
  });
});
export default handler;
