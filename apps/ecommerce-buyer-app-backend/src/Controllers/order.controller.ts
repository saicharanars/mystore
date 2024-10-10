import {
  createOrderResponse,
  createorderType,
  orderresponse,
  sellerorderresponse,
  userordersresponse,
  usertokentype,
  verifypaymentbodyType,
} from '@ecommerce/types';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import Razorpay from 'razorpay';
import 'dotenv/config';
import {
  createOrder,
  editOrder,
  sellerOrders,
} from '../Services/order.service';
import { userOrders } from '../Services/order.service';
import { Request, Response, NextFunction } from 'express';

const createorder = async (req: Request, res: Response, next: NextFunction) => {
  const usertoken: usertokentype = req['user'];
  console.log(usertoken, '>>', req.body);
  const options = req.body;
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  const order = await instance.orders.create({
    amount: options.amount * 100,
    currency: 'INR',
  });

  console.log(req['user'], order);
  const ordervalue: createorderType = {
    rzp_orderId: order.id,
    status: 'PENDING' as const,
    userId: usertoken.id,
    order_value: options.amount,
    products: options.products,
    locationId: options.locationId,
  };
  console.log(ordervalue, '>>>>>>');
  const ordertable = await createOrder(ordervalue);
  console.log(ordertable);
  const data = {
    orderId: ordertable.id,
    razorpayorderId: order.id,
  };
  const safeUserData = createOrderResponse.parse(data);

  res.status(StatusCodes.CREATED).json({
    data: safeUserData,
    message: getReasonPhrase(StatusCodes.CREATED),
  });
};
const verify = async (req: Request, res: Response, next: NextFunction) => {
  const body: verifypaymentbodyType = req.body.verifypaymentbody;
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  const { order_id, razorpay_payment_id } = body;
  console.log(razorpay_payment_id, body);
  const verifypayment = await instance.payments.fetch(razorpay_payment_id);

  console.log(verifypayment);
  if (verifypayment.captured) {
    const updateorder = await editOrder(
      { status: 'SUCCESS', paymentId: razorpay_payment_id },
      order_id
    );
    console.log(updateorder, '>>>>>>>');

    const data = orderresponse.parse(updateorder);
    console.log(data);

    res
      .status(StatusCodes.CREATED)
      .json({ message: getReasonPhrase(StatusCodes.CREATED), data });
  } else if (verifypayment.status === 'failed') {
    const updateorder = await editOrder(
      { status: 'FAILURE', paymentId: razorpay_payment_id },
      order_id
    );
    console.log(updateorder, '>>>>>>>');
    const data = orderresponse.parse(updateorder);
    console.log(data);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: getReasonPhrase(StatusCodes.BAD_REQUEST),
      data,
    });
  }
};
const getuserorders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usertoken: usertokentype = req['user'];
  const { offset, limit } = req.query;
  const parsedOffset = typeof offset === 'string' ? parseInt(offset, 10) : 0;
  const parsedLimit = typeof limit === 'string' ? parseInt(limit, 10) : 5;
  console.log(offset, limit);
  const result = await userOrders(usertoken.id, parsedOffset, parsedLimit);

  const data = userordersresponse.parse(result);
  return res
    .status(StatusCodes.OK)
    .json({ data, message: getReasonPhrase(StatusCodes.OK) });
};

const getsellerorders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usertoken: usertokentype = req['user'];
  const { offset, limit } = req.query;
  console.log(offset, limit);
  const parsedOffset = typeof offset === 'string' ? parseInt(offset, 10) : 0;
  const parsedLimit = typeof limit === 'string' ? parseInt(limit, 10) : 5;

  const result = await sellerOrders(usertoken.id, parsedOffset, parsedLimit);
  const data = sellerorderresponse.parse(result);
  return res
    .status(StatusCodes.OK)
    .json({ data, message: getReasonPhrase(StatusCodes.OK) });
};
export { createorder, verify, getuserorders, getsellerorders };
