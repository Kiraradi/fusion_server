import { AppDataSource } from "../dataSource";
import { Book } from "../entities/Book";

const bookRepository = AppDataSource.getRepository(Book);

const getAll = () => {
  return bookRepository.find();
};

export const getOneById = (id: number) => {
  return bookRepository.findOneBy({ id });
};

export const save = (book: Book) => {
  return bookRepository.save(book);
};

export default {
  getAll,
  getOneById,
  save,
};
