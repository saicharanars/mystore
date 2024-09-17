import { createUser } from './user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { createuser } from '@ecommerce/types';
import { ApiError } from '../utils/apierrorclass';
import { StatusCodes } from 'http-status-codes';
dotenv.config();
async function signupUser(createUserdto: createuser) {
  const { email, password, name, role } = createUserdto;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { name, email, password: hashedPassword, role };
  console.log(user);
  const userResult = await createUser(user);
  if (!userResult) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'something wentwrng');
  }
  return userResult;
}

async function checkPassword(
  originalPassword: string,
  checkingPassword: string
): Promise<boolean> {
  return await bcrypt.compare(checkingPassword, originalPassword);
}

async function generateToken(payload: object): Promise<string> {
  const secretKey = process.env.JWT_SECRET_KEY;
  console.log(secretKey);
  if (!secretKey) {
    throw new Error('JWT secret key is not defined');
  }
  const token = await jwt.sign(payload, secretKey, { expiresIn: '24h' });
  console.log(token);
  return token;
}

export { signupUser, checkPassword, generateToken };
