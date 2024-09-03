import { Sequelize } from 'sequelize-typescript';
import "dotenv/config"
import User from './models/user';
import Location from './models/location';
import UserLocation from './models/userLocation';

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST = 'localhost',
  DB_PORT = '5432',
} = process.env;

const connection = new Sequelize({
  database: DB_NAME,
  dialect: 'postgres',
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  models: [User, Location, UserLocation], // Make sure all models are correctly imported
  logging: console.log,
});

export default connection;