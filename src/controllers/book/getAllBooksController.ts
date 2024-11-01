import { NextFunction, Request } from "express";
import { Book } from "../../database/entities/Book";
import { ResponseWithBody } from "../../types/types";
import bookRepository from "../../database/repositories/bookRepository";

export const getAllBooksController = async (
  req: Request,
  res: ResponseWithBody<Book[]>,
  next: NextFunction,
) => {
  try {
    const allBooks = await bookRepository.getAll();

    res.status(200).send({
      payload: allBooks,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};
