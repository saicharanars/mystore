import { Router } from 'express';
import { getUserLocations } from '../Controllers/location.controller';
import { Authorization } from '../middleware/authorization';
import { asyncHandler } from '../utils/asyncHandler';
import { getUserDetails } from '../Controllers/user.controller';

const userroute = Router();

userroute.get('/', Authorization(), asyncHandler(getUserDetails));
export default userroute;
