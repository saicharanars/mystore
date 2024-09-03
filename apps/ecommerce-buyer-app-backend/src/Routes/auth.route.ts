import { Router } from 'express';
import { validateRequest } from '../middleware/validation';
import {createuserDto, signinDto} from "@ecommerce/types"
import { signin, signup } from '../Controllers/auth.controller';

const authroute = Router();


authroute.post(
  '/signup',
  validateRequest({
    body: createuserDto,
  }),
  signup
);
authroute.post('/signin', validateRequest({ body: signinDto }), signin);
// Export the authroute correctly
export default authroute;
