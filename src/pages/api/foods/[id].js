import nc from 'next-connect';
import Food from '../../../models/Food';
import db from '../../../utils/db';
const handler = nc();

handler.get(async(req, res) => {
  await db.connect();
  const food = await Food.findById(req.query.id);
  await db.disconnect()
  res.send(food);
});
export default handler;
