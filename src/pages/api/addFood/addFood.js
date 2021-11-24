import nc from "next-connect";
import Food from "../../../models/Food";
import db from "../../../utils/db";

const handler = nc();
handler.post(async (req, res) => {
  await db.connect();
  const newFoods = new Food({
    name: req.body.name,
    slug: req.body.slug,
    shortDesc: req.body.shortDesc,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    image: req.body.img,
    prichard: false,
  });
  const foods = await newFoods.save();
  await db.disconnect();

  res.send({
    name: foods.name,
    slug: foods.slug,
    shortDesc: foods.shortDesc,
    category: foods.category,
    price: foods.price,
    description: foods.description,
    image: foods.img,
    prichard: foods.prichard,
  });
});
export default handler;
