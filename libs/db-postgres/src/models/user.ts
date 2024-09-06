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

@Table({
  timestamps: true, // Enable auto timestamps for createdAt and updatedAt
  paranoid: true, // Enable soft deletes (deletedAt)
})
class User extends Model<User> {
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

  @IsEmail
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true, // Ensure email is unique
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
  role: 'customer' | 'seller'; // Define as union of allowed values
  @BelongsToMany(() => Location, () => UserLocation)
  locations?: Location[];
  @HasMany(() => Product)
  products: Product[];
  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}

export default User;
