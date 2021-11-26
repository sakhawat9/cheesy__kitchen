import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact = mongoose.models.contact || mongoose.model("contact", contactSchema);
export default Contact;
