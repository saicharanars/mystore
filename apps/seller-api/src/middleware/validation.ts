import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodObject, ZodRawShape } from 'zod';
import { ApiError } from '../utils/apierror';
import { StatusCodes } from 'http-status-codes';

type ValidationSchemas = {
  body?: ZodObject<ZodRawShape>;
  query?: ZodObject<ZodRawShape>;
  params?: ZodObject<ZodRawShape>;
};

const validateRequest = (schemas: ValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        schemas.body.parse(req.body);
      }
      if (schemas.query) {
        schemas.query.parse(req.query);
      }
      if (schemas.params) {
        schemas.params.parse(req.params);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join('; ');

        next(
          new ApiError(
            StatusCodes.BAD_REQUEST,
            `Validation Error: ${errorMessage}`
          )
        );
      } else {
        next(error);
      }
    }
  };
};

export { validateRequest };
