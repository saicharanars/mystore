import 'reflect-metadata';
import {
  Table,
  Column,
  Model,
  DataType,
  IsUUID,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import User from './user';
import Product from './product';
import OrderProduct from './order_products';

@Table({
  timestamps: true,
  tableName: 'neworders',
})
class Order extends Model<Order> {
  @IsUUID(4)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  paymentId: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  rzp_orderId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  order_value: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  owner: User;

  @BelongsToMany(() => Product, () => OrderProduct)
  products: Product[];

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  async addProducts(products: Array<{ id: string; quantity: number }>) {
    const orderProducts = products.map((product) => ({
      orderId: this.id,
      productId: product.id,
      quantity: product.quantity,
    }));

    await OrderProduct.bulkCreate(orderProducts);
  }
}

export default Order;
