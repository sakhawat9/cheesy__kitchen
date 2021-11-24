import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDesc: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    prichard: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.models.Food || mongoose.model("Food", foodSchema);
export default Food;
