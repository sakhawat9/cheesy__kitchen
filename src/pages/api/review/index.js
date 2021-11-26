import nc from "next-connect";
import Review from "../../../models/Review";
import { signToken } from "../../../utils/auth";
import db from "../../../utils/db";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const newUser = new Review({
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
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
    description: user.description,
    img: user.img,
  });
});
export default handler;
