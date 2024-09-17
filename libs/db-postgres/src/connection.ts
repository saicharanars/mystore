import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';
import User from './models/user';
import Location from './models/location';
import UserLocation from './models/userLocation';
import Product from './models/product';
import Order from './models/order';
import { OrderProduct } from './models';

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const connection = new Sequelize({
  database: DB_NAME,
  dialect: 'postgres',
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  models: [User, Location, UserLocation, OrderProduct, Order, Product],
  logging: console.log,
  timezone: '+05:30',
});

export default connection;
