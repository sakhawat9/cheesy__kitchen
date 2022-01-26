import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    facebook: { type: String, default: "" },
    linkedIn: { type: String, default: "" },
    twitter: { type: String, default: "" },
    img: {
      type: String,
      default:
        "https://res.cloudinary.com/academist/image/upload/v1635867877/instagram-3814050_960_720_tuxecu.png",
    },
    user: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);
export default User;
