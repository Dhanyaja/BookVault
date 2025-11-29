import Book from "../models/Book.js";

export const createBook = async (data, userId = null) => {
  const book = await Book.create({
    ...data,
    createdBy: userId,
  });
  return book;
};

export const getBookByExternalId = async (externalId) => {
  return Book.findOne({ externalId });
};

export const getBookById = async (id) => Book.findById(id);

export const listBooks = async (filter, skip, limit, sort) => {
  const docs = await Book.find(filter).skip(skip).limit(limit).sort(sort);
  const total = await Book.countDocuments(filter);
  return { docs, total };
};

export const queryBooks = async (
  filters = {},
  { skip = 0, limit = 10, sort = { createdAt: -1 } } = {}
) => {
  const mongoFilter = {};

  // text search
  if (filters.q) {
    mongoFilter.$text = { $search: filters.q };
  }

  // author filter
  if (filters.author) {
    mongoFilter.authors = { $regex: filters.author, $options: "i" };
  }

  // genre filter
  if (filters.genre) {
    mongoFilter.genres = { $regex: filters.genre, $options: "i" };
  }

  // year filter
  if (filters.year) {
    mongoFilter.publishYear = Number(filters.year);
  }

  // isbn filter
  if (filters.isbn) {
    mongoFilter.$or = [{ isbn10: filters.isbn }, { isbn13: filters.isbn }];
  }

  // rating filter (optional)
  if (filters.minRating) {
    mongoFilter.avgRating = { $gte: Number(filters.minRating) };
  }

  // execute query
  const [total, docs] = await Promise.all([
    Book.countDocuments(mongoFilter),
    Book.find(mongoFilter).skip(skip).limit(limit).sort(sort).lean(),
  ]);

  return { total, docs };
};

export const deleteBook = async (id) => {
  const result = await Book.findByIdAndDelete(id);
  return result !== null; // true if deleted, false if not found
};
