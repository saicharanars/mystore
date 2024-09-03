import {
    Table,
    Column,
    Model,
    DataType,
    IsUUID,
    BelongsToMany,
    CreatedAt,
    DeletedAt,
    UpdatedAt,
  } from 'sequelize-typescript';
  import User from './user';
  import UserLocation from './userLocation';
  
  @Table({
    timestamps: true,
    paranoid: true
  })
  class Location extends Model {
    @IsUUID(4)
    @Column({
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true
    })
    id!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false
    })
    address!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    city!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false
    })
    state!: string;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: false
    })
    pincode!: number;
  
    @BelongsToMany(() => User, () => UserLocation)
    users?: User[];
  
    @CreatedAt
    creationDate!: Date;
  
    @UpdatedAt
    updatedOn!: Date;
  
    @DeletedAt
    deletionDate!: Date;
  }
  
  export default Location;