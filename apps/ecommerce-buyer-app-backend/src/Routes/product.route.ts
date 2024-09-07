import { Router } from 'express';
import { Authorization } from '../middleware/authorization';
import { validateRequest } from '../middleware/validation';
import {
  createProductDto,
  editProductDto,
  productFiltersDto,
} from '@ecommerce/types';
import {
  createproduct,
  deleteproduct,
  editproduct,
  findallproducts,
  findProduct,
} from '../Controllers/product.controller';
import { z } from 'zod';

const product = Router();
product.post(
  '/',
  validateRequest({ body: createProductDto }),
  Authorization('seller'),
  createproduct
);
product.delete(
  '/:productId',
  validateRequest({
    params: z.object({
      productId: z.string().uuid(),
    }),
  }),
  Authorization('seller'),
  deleteproduct
);
product.patch(
  '/:productId',
  validateRequest({
    params: z.object({
      productId: z.string().uuid(),
    }),
    body: editProductDto,
  }),
  Authorization('seller'),
  editproduct
);
product.get(
  '/',
  validateRequest({
    query: productFiltersDto,
  }),
  findallproducts
);
product.get(
  '/:productId',
  validateRequest({
    params: z.object({
      productId: z.string().uuid(),
    }),
  }),
  findProduct
);

export default product;
