import { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { findUserByEmail } from '../Services/user.service';
import {
  signupUser,
  checkPassword,
  generateToken,
} from '../Services/auth.service';
import { createuser, createuserResponse, signinuser } from '@ecommerce/types';

// Signup handler
const signup = async (req: Request, res: Response) => {
  try {
    const body: createuser = req.body;
    const { email } = body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({
        error: {
          message: 'User with this email already exists.',
        },
      });
    }

    const newUser = await signupUser(body);
    const safeUserData = createuserResponse.parse(newUser);

    res.status(StatusCodes.CREATED).json({
      data: safeUserData,
      message: getReasonPhrase(StatusCodes.CREATED),
    });
  } catch (error) {
    console.error('Signup error:', error); // Log error for debugging
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        message: 'An error occurred while processing your request.',
      },
    });
  }
};

// Signin handler
const signin = async (req: Request, res: Response) => {
  try {
    const body: signinuser = req.body;
    const { email, password } = body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: {
          message: 'User with this email does not exist. Please sign up.',
        },
      });
    }

    const isPasswordValid = await checkPassword(user.password, password);
    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: {
          message: 'Incorrect password.',
        },
      });
    }

    const token = await generateToken({
      id: user.id,
      email: user.email,
    });

    res.status(StatusCodes.OK).json({
      data: {
        access_token: token,
      },
      message: getReasonPhrase(StatusCodes.OK),
    });
  } catch (error) {
    console.error('Signin error:', error); // Log error for debugging
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        message: 'An error occurred while processing your request.',
      },
    });
  }
};

export { signup, signin };
