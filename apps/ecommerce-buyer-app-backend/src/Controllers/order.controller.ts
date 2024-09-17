import {
  createOrderResponse,
  createorderType,
  orderresponse,
  userordersresponse,
  usertokentype,
  verifypaymentbodyType,
} from '@ecommerce/types';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import Razorpay from 'razorpay';
import 'dotenv/config';
import { createOrder, editOrder } from '../Services/order.service';
import { userOrders } from '../Services/order.service';

const createorder = async (req, res) => {
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

  console.log(req.user, order);
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
const verify = async (req, res) => {
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
const getuserorders = async (req, res) => {
  const usertoken = req.user;
  const { offset, limit } = req.query;
  console.log(offset, limit);
  if (offset && limit) {
    const result = await userOrders(
      usertoken.id,
      parseInt(offset),
      parseInt(limit)
    );
    const data = userordersresponse.parse(result);
    return res
      .status(StatusCodes.OK)
      .json({ data, message: getReasonPhrase(StatusCodes.OK) });
  }

  const result = await userOrders(usertoken.id, 0, 5);
  const data = userordersresponse.parse(result);
  return res
    .status(StatusCodes.OK)
    .json({ data, message: getReasonPhrase(StatusCodes.OK) });
};

export { createorder, verify, getuserorders };
