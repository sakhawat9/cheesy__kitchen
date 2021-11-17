import nc from 'next-connect';
import Food from '../../../models/Food';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const foods = await Food.find({});
  await db.disconnect();
  res.send(foods);
});

export default handler;