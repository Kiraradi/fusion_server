import { NextFunction, Request } from "express";
import { ResponseWithBody } from "../../types/types";
import { Book } from "../../database/entities/Book";
import { CustomError } from "../../services/ErrorService";
import BookService from "../../services/BookService";

interface IParams {
  id: number;
}

export const getBookController = async (
  req: Request<IParams, unknown, unknown>,
  res: ResponseWithBody<Book>,
  next: NextFunction,
) => {
  try {
    const bookId = Number(req.params.id);

    if (!bookId) {
      throw new CustomError(404, "id not found");
    }

    const book = await BookService.getBookById(bookId);

    res.status(200).send({
      payload: book,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};
