import { NextFunction, Request } from "express";
import { Book } from "../../database/entities/Book";
import { ResponseWithBody } from "../../types/types";
import bookRepository from "../../database/repositories/bookRepository";

export const saveBooksController = async (
  req: Request<unknown, unknown, Book>,
  res: ResponseWithBody<null>,
  next: NextFunction,
) => {
  try {
    const data = req.body
    await bookRepository.save(data);

    res.status(200).send({
      payload: null,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};