import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    img: {
      type: String,
      default:
        "https://res.cloudinary.com/academist/image/upload/v1635867877/instagram-3814050_960_720_tuxecu.png",
    },
  },
  { timestamps: true }
);

const Comment = mongoose.models.comment || mongoose.model("comment", commentSchema);
export default Comment;
