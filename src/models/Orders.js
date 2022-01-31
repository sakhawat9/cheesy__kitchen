import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    paymentInfo: {
      brand: { type: String, required: true },
      country: { type: String, required: true },
      last4: { type: String, required: true },
    },
    phone: { type: String, required: true },
    address: { type: String, required: true },

    userInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      isAdmin: { type: Boolean, required: true, default: false },
      token: { type: String, required: true },
      _id: { type: String, required: true },
    },

    cartItems: [
      {
        name: { type: String, required: true },
        slug: { type: String, required: true },
        shortDesc: { type: String, required: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        rating: { type: Number, required: true, default: 0 },
        countInStock: { type: Number, required: true, default: 0 },
        description: { type: String, required: true },
        prichard: { type: Boolean, required: true, default: false },
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.models.order || mongoose.model("order", ordersSchema);
export default Order;
