import mongoose from "mongoose";

const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    title: { type: String, required: true, index: true },
    subtitle: String,
    authors: { type: [String], default: [] },
    description: String,
    coverImage: String,
    publishYear: Number,
    isbn10: String,
    isbn13: String,
    pages: Number,
    publisher: String,
    genres: { type: [String], default: [] },
    language: { type: String, default: "en" },

    externalId: String,
    source: {
      type: String,
      enum: ["openLibrary", "googleBooks", "custom"],
      default: "custom",
    },

    readingProgress: {
      type: Number,
      default: 0,
    },

    notes: {
      type: String,
      default: "",
    },

    avgRating: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

BookSchema.index({
  title: "text",
  authors: "text",
  description: "text",
});

export default mongoose.model("Book", BookSchema);
