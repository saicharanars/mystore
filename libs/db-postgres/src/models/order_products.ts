import {
  Table,
  Model,
  ForeignKey,
  Column,
  DataType,
} from 'sequelize-typescript';
import Order from './order';
import Product from './product';

@Table({
  timestamps: true,
  tableName: 'order_products_table',
})
class OrderProduct extends Model {
  @ForeignKey(() => Order)
  @Column(DataType.UUID)
  orderId: string;

  @ForeignKey(() => Product)
  @Column(DataType.UUID)
  productId: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  quantity: number;
}

export default OrderProduct;
