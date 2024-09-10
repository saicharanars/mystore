import { z } from 'zod';
import { createProductDto, productResponse } from './product';

const createOrderDto = z.object({
  rzp_orderId: z.string(),
  status: z.enum(['PENDING', 'SUCCESS', 'FAILURE']),
  userId: z.string().uuid(),
  order_value: z.number(),
  paymentId: z.string().optional(),
  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().int().positive(),
    })
  ),
});
const createOrderResponse = z.object({
  orderId: z.string(),
  razorpayorderId: z.string(),
});
const paymentResponse = z.object({
  razorpay_payment_id: z.string(),
  razorpay_order_id: z.string(),
  razorpay_signature: z.string(),
});
const verifypaymentbody = paymentResponse.extend({
  order_id: z.string(),
});
const orderresponse = z.object({
  id: z.string(),
  status: z.enum(['SUCCESS', 'FAILURE']),
});

const userordersresponse = z.object({
  name: z.string(),
  id: z.string().uuid(),
  orders: z.array(
    createOrderDto
      .pick({
        status: true,
        order_value: true,
      })
      .extend({
        id: z.string().uuid(),
        products: z.array(
          productResponse
            .pick({
              id: true,
              name: true,
              price: true,
            })
            .extend({
              OrderProduct: z.object({
                quantity: z.number(),
              }),
            })
        ),
      })
  ),
});

const editOrderdto = createOrderDto.partial();
type createorderType = z.infer<typeof createOrderDto>;
type editorderType = z.infer<typeof editOrderdto>;
type paymentResponseType = z.infer<typeof paymentResponse>;
type verifypaymentbodyType = z.infer<typeof verifypaymentbody>;
type createOrderResponseType = z.infer<typeof createOrderResponse>;
type userordersresponseType = z.infer<typeof userordersresponse>;
type orderresponseType = z.infer<typeof orderresponse>;
export {
  createOrderDto,
  createorderType,
  createOrderResponse,
  createOrderResponseType,
  editOrderdto,
  editorderType,
  paymentResponse,
  paymentResponseType,
  verifypaymentbody,
  verifypaymentbodyType,
  userordersresponse,
  userordersresponseType,
  orderresponse,
  orderresponseType,
};
