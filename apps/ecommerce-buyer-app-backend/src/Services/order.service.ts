import { createorderType, editorderType } from '@ecommerce/types';
import { Product, Order, OrderProduct } from '@ecommerce/db-postgres';
import { Transaction } from 'sequelize';
import { ApiError } from '../utils/apierrorclass';
import { StatusCodes } from 'http-status-codes';

async function createOrder(createOrder: createorderType) {
  const {
    rzp_orderId,
    status,
    userId,
    order_value,
    paymentId,
    products,
    locationId,
  } = createOrder;

  return await Order.sequelize.transaction(async (t: Transaction) => {
    const order = await Order.create(
      {
        rzp_orderId,
        status,
        userId,
        order_value,
        paymentId,
        locationId,
      },
      { transaction: t }
    );
    if (!order) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to create order'
      );
    }

    if (products && products.length > 0) {
      const orderProducts = products.map((product) => ({
        orderId: order.id,
        productId: product.id,
        quantity: product.quantity,
      }));

      await OrderProduct.bulkCreate(orderProducts, { transaction: t });
    }

    const createdOrder = await Order.findByPk(order.id, {
      include: [Product],
      transaction: t,
    });
    if (!createOrder) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to create order'
      );
    }

    return createdOrder;
  });
}

async function editOrder(editOrder: editorderType, orderid: string) {
  return await Order.sequelize.transaction(async (t: Transaction) => {
    const order = await Order.findByPk(orderid, {
      include: [Product],
      transaction: t,
    });

    if (!order) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'order not found');
    }

    const { rzp_orderId, status, userId, order_value, paymentId, products } =
      editOrder;

    if (rzp_orderId !== undefined) order.rzp_orderId = rzp_orderId;
    if (status !== undefined) order.status = status;
    if (userId !== undefined) order.userId = userId;
    if (order_value !== undefined) order.order_value = order_value;
    if (paymentId !== undefined) order.paymentId = paymentId;

    await order.save({ transaction: t });

    if (products) {
      await OrderProduct.destroy({
        where: { orderId: order.id },
        transaction: t,
      });

      const orderProducts = products.map((product) => ({
        orderId: order.id,
        productId: product.id,
        quantity: product.quantity,
      }));

      await OrderProduct.bulkCreate(orderProducts, { transaction: t });
    }

    const updatedOrder = await Order.findByPk(order.id, {
      include: [Product],
      transaction: t,
    });

    return updatedOrder;
  });
}

async function userOrders(userId: string, offset: number, limit: number) {
  console.log(userId, offset, limit, '>>>>>>>>>>');
  const { count, rows } = await Order.findAndCountAll({
    where: { userId },
    attributes: ['id', 'status', 'order_value', 'creationDate'],
    include: [
      {
        attributes: ['id', 'name', 'price'],
        model: Product,
        through: {
          attributes: ['quantity'],
        },
      },
    ],
    order: [['creationDate', 'DESC']],
    limit: limit,
    offset: offset,
  });
  const items = rows;
  return { count, items };
}
export { createOrder, editOrder, userOrders };
