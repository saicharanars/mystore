import 'reflect-metadata';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  IsUUID,
} from 'sequelize-typescript';
import User from './user';
import Location from './location';

@Table({
  timestamps: true,
  paranoid: true,
})
class UserLocation extends Model<UserLocation> {
  @IsUUID(4)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @ForeignKey(() => Location)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  locationId: string;
  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}

export default UserLocation;
