import { Router } from 'express';
import { Authorization } from '../middleware/authorization';
import {
  createorder,
  getuserorders,
  verify,
} from '../Controllers/order.controller';
import { validateRequest } from '../middleware/validation';
import { z } from 'zod';
import { verifypaymentbody } from '@ecommerce/types';

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
    }),
  }),
  Authorization('customer'),
  createorder
);

order.post(
  '/update-transaction-status',
  validateRequest({
    body: z.object({ verifypaymentbody }),
  }),
  verify
);
order.get('/user-orders', Authorization('customer'), getuserorders);
export default order;
