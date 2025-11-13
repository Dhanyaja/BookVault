import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String },
    coverImage: { type: String },
    description: { type: String },
    publishedDate: { type: String },
    isbn: { type: String, unique: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", bookSchema);
