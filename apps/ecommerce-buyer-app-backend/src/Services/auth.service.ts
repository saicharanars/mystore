import { createUser } from './user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { createuser } from '@ecommerce/types';
dotenv.config();
async function signupUser(createUserdto: createuser) {
  try {
    const { email, password, name,role } = createUserdto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, email, password: hashedPassword ,role};
    console.log(user);
    const userResult = await createUser(user);
    return userResult;
  } catch (error) {
    console.error('Error in signupUser:', error);
    throw new Error(error);
  }
}

async function checkPassword(
  originalPassword: string,
  checkingPassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(checkingPassword, originalPassword);
  } catch (error) {
    throw new Error(error);
  }
}

async function generateToken(payload: object): Promise<string> {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    console.log(secretKey);
    if (!secretKey) {
      throw new Error('JWT secret key is not defined');
    }
    const token = await jwt.sign(payload, secretKey, { expiresIn: '24h' });
    console.log(token);
    return token;
  } catch (error) {
    throw new Error(error);
  }
}

export { signupUser, checkPassword, generateToken };
