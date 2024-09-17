import { Router } from 'express';
import { validateRequest } from '../middleware/validation';
import { createuserDto, signinDto } from '@ecommerce/types';
import { signin, signup } from '../Controllers/auth.controller';
import { asyncHandler } from '../utils/asyncHandler';

const authroute = Router();

authroute.post(
  '/signup',
  validateRequest({
    body: createuserDto,
  }),
  asyncHandler(signup)
);
authroute.post(
  '/signin',
  validateRequest({ body: signinDto }),
  asyncHandler(signin)
);
export default authroute;
