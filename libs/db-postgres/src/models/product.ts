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
import Order from './order';
import OrderProduct from './order_products';

@Table({
  timestamps: true, // Enable auto timestamps for createdAt and updatedAt
  paranoid: true,
  tableName: 'newproducts',
})
class Product extends Model<Product> {
  @IsUUID(4) // Validate UUID v4 format
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4, // Generate UUID by default
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  compare_price: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  inventory_quantity: number;
  @Column({
    type: DataType.ARRAY(DataType.STRING),

    allowNull: true,
  })
  tags: string[];

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID, // Ensure this is UUID to match the Users table
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  owner: User;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  additionproperties: object;

  @BelongsToMany(() => Order, () => OrderProduct)
  orders: Order[];

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
  OrderProduct: any;
}

export default Product;
