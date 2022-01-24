import nc from "next-connect";
import Food from "../../../../../models/Food";
import { isAuth } from "../../../../../utils/auth";
import db from "../../../../../utils/db";

const handler = nc();
handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  const foods = await Food.findById(req.query.id);
  await db.disconnect();
  res.send(foods);
});

handler.put(async (req, res) => {
  await db.connect();
  const foods = await Food.findById(req.query.id);
  if (foods) {
    foods.title = req.body.title;
    foods.slug = req.body.slug;
    foods.shortDesc = req.body.shortDesc;
    foods.categories = req.body.categories;
    foods.level = req.body.level;
    foods.price = req.body.price;
    foods.videoUrl = req.body.videoUrl;
    foods.prichard = Boolean(req.body.prichard);
    foods.img = req.body.img;
    foods.desc = req.body.desc;
    await foods.save();
    await db.disconnect();
    res.send({ message: "Foods Updated Successfully" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Foods Not Found" });
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  const foods = await Food.findById(req.query.id);
  if (foods) {
    await foods.remove();
    await db.disconnect();
    res.send({ message: 'Foods Deleted' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Foods Not Found' });
  }
});

export default handler;