import 'reflect-metadata';
import {
  Table,
  Column,
  Model,
  DataType,
  IsUUID,
  BelongsToMany,
  IsEmail,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import Location from './location';
import UserLocation from './userLocation';
import Product from './product';
import Order from './order';

@Table({
  timestamps: true,
  paranoid: true,
})
class User extends Model<User> {
  @IsUUID(4)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @IsEmail
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM('customer', 'seller'),
    allowNull: false,
  })
  role: 'customer' | 'seller';
  @BelongsToMany(() => Location, () => UserLocation)
  locations?: Location[];
  @HasMany(() => Product)
  products: Product[];
  @HasMany(() => Order)
  orders: Order[];
  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}

export default User;
