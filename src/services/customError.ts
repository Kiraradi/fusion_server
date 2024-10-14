export class CustomError extends Error {
  code: number;
  constructor(code = 500, message = "") {
    super(message);
    this.code = code;
  }
}
