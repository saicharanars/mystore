import { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { findUserByEmail } from '../Services/user.service';
import {
  signupUser,
  checkPassword,
  generateToken,
} from '../Services/auth.service';
import { createuser, createuserResponse, signinuser } from '@ecommerce/types';
import { ApiError } from '../utils/apierrorclass';

const signup = async (req: Request, res: Response) => {
  const body: createuser = req.body;
  const { email } = body;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'User with this email already exists.'
    );
  }

  const newUser = await signupUser(body);
  const safeUserData = createuserResponse.parse(newUser);

  res.status(StatusCodes.CREATED).json({
    data: safeUserData,
    message: getReasonPhrase(StatusCodes.CREATED),
  });
};

const signin = async (req: Request, res: Response) => {
  const body: signinuser = req.body;
  const { email, password } = body;

  const user = await findUserByEmail(email);
  if (!user) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      'User with this email doesnt exists.'
    );
  }

  const isPasswordValid = await checkPassword(user.password, password);
  if (!isPasswordValid) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Please Checkyour Password');
  }

  const token = await generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  res.status(StatusCodes.OK).json({
    data: {
      access_token: token,
    },
    message: getReasonPhrase(StatusCodes.OK),
  });
};

export { signup, signin };
