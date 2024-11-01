import bookRepository from "../database/repositories/bookRepository";
import { CustomError } from "./ErrorService";

const getBookById = async (bookId: number) => {
  const book = await bookRepository.getOneById(bookId);

  if (!book) {
    throw new CustomError(404, "book not found");
  }

  return book;
};

export default {
  getBookById,
};
