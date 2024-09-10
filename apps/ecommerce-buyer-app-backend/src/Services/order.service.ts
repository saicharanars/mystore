import { createorderType, editorderType } from '@ecommerce/types';
import { Product, Order, OrderProduct } from '@ecommerce/db-postgres';
import { Transaction } from 'sequelize';

async function createOrder(createOrder: createorderType) {
  const { rzp_orderId, status, userId, order_value, paymentId, products } =
    createOrder;

  try {
    return await Order.sequelize.transaction(async (t: Transaction) => {
      const order = await Order.create(
        {
          rzp_orderId,
          status,
          userId,
          order_value,
          paymentId,
        },
        { transaction: t }
      );

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

      return createdOrder;
    });
  } catch (error) {
    throw new Error(`Error creating order: ${error.message}`);
  }
}

async function editOrder(editOrder: editorderType, orderid: string) {
  try {
    return await Order.sequelize.transaction(async (t: Transaction) => {
      const order = await Order.findByPk(orderid, {
        include: [Product],
        transaction: t,
      });

      if (!order) {
        throw new Error('Order not found');
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
  } catch (error) {
    throw new Error(`Error editing order: ${error.message}`);
  }
}

export { createOrder, editOrder };
