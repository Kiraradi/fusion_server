import { Router } from "express";
import { getAllBooksController } from "../controllers/book/getAllBooksController";
import { validateRequestBody } from "../middleware/validateRequestBody";
import { getBookSchama } from "../services/validation/schemas/BookSchemas/getBookSchema";
import { getBookController } from "../controllers/book/getBookController";
import { saveBooksController } from "../controllers/book/saveBookController";

const bookRouter = Router();

bookRouter.get("/all", getAllBooksController);
bookRouter.post("/save", saveBooksController)
bookRouter.get("/:id", validateRequestBody(getBookSchama), getBookController);

export default bookRouter;
