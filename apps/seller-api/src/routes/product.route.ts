import express, { Router } from 'express';
import { asyncHandler } from '../utils/asynchandler';
import productController from '../controllers/product.controller';
import { validateRequest } from '../middleware/validation';
import {
  createProductSchema,
  editProduct,
  productFilters,
} from '@ecommerce/types';
import { Authorization } from '../middleware/authorization';
import { z } from 'zod';

class ProductRoutes {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/findproducts/',
      validateRequest({
        query: productFilters.partial(),
      }),
      asyncHandler(productController.getAll)
    );
    this.router.post(
      '/',
      Authorization('seller'),
      validateRequest({
        body: createProductSchema,
      }),
      asyncHandler(productController.create)
    );
    this.router.get(
      '/:productid',
      validateRequest({
        params: z.object({
          productid: z.string().uuid(),
        }),
      }),
      asyncHandler(productController.getById)
    );
    this.router.patch(
      '/:productid',
      Authorization('seller'),
      validateRequest({
        params: z.object({
          productid: z.string().uuid(),
        }),
        body: editProduct,
      }),
      asyncHandler(productController.update)
    );
    this.router.delete(
      '/:productid',
      Authorization('seller'),
      validateRequest({
        params: z.object({
          productid: z.string().uuid(),
        }),
      }),
      asyncHandler(productController.delete)
    );
  }
}

export default new ProductRoutes().router;
