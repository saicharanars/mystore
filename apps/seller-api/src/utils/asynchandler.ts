import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

export const asyncHandler =
  (handler: AsyncFunction) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch((err) => {
      console.log(err);
      if (err instanceof ZodError) {
        const simplifiedErrors = err.errors.map((err) => ({
          message: err.message,
          path: err.path.join('.'),
        }));
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ errors: simplifiedErrors });
      }
      next(err);
    });
  };
