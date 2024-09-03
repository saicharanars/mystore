import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodObject, ZodRawShape } from 'zod';

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
      next(); // Proceed if validation passes
    } catch (error) {
      if (error instanceof ZodError) {
        // Simplify the error response here
        const simplifiedErrors = error.errors.map((err) => ({
          message: err.message,
          path: err.path.join('.'), // Optional: format the path
        }));
        return res.status(400).json({ errors: simplifiedErrors });
      }
      next(error); // Pass other errors to the error handler
    }
  };
};

export { validateRequest };
