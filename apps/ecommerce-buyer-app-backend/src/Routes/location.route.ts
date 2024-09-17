import { Router } from 'express';
import {
  addLocation,
  getLocation,
  getUserLocations,
  removeLocation,
  updateLocation,
} from '../Controllers/location.controller';
import { validateRequest } from '../middleware/validation';
import { createLocationDto, editLocation } from '@ecommerce/types';
import { z } from 'zod';
import { Authorization } from '../middleware/authorization';
import { asyncHandler } from '../utils/asyncHandler';

const locationroute = Router();
locationroute.post(
  '/create',
  Authorization(),
  validateRequest({
    body: createLocationDto,
  }),
  asyncHandler(addLocation)
);
locationroute.patch(
  '/update/:locationId',
  validateRequest({
    body: editLocation,
    params: z.object({
      locationId: z.string().uuid(),
    }),
  }),
  Authorization(),
  asyncHandler(updateLocation)
);
locationroute.delete(
  '/delete/:locationId',
  validateRequest({
    params: z.object({
      locationId: z.string().uuid(),
    }),
  }),
  Authorization(),
  asyncHandler(removeLocation)
);
locationroute.get(
  '/:locationId',
  validateRequest({
    params: z.object({
      locationId: z.string().uuid(),
    }),
  }),
  asyncHandler(getLocation)
);
locationroute.get(
  '/user/locations',
  Authorization(),
  asyncHandler(getUserLocations)
);
export default locationroute;
