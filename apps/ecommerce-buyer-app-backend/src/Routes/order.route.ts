import { Router } from 'express';
import { Authorization } from '../middleware/authorization';
import {
  createorder,
  getuserorders,
  verify,
} from '../Controllers/order.controller';
import { validateRequest } from '../middleware/validation';
import { z } from 'zod';
import { pagination, verifypaymentbody } from '@ecommerce/types';
import { asyncHandler } from '../utils/asyncHandler';

const order = Router();
order.post(
  '/create-order',
  validateRequest({
    body: z.object({
      amount: z.number(),
      products: z.array(
        z.object({
          id: z.string().uuid(),
          quantity: z.number().int().positive(),
        })
      ),
      locationId: z.string().uuid(),
    }),
  }),
  Authorization('customer'),
  asyncHandler(createorder)
);

order.post(
  '/update-transaction-status',
  validateRequest({
    body: z.object({ verifypaymentbody }),
  }),
  asyncHandler(verify)
);
order.get(
  '/user-orders',
  validateRequest({
    query: pagination,
  }),
  Authorization('customer'),
  asyncHandler(getuserorders)
);
export default order;
