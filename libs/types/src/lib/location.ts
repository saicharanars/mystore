import { z } from 'zod';
import { createuserResponse } from './user';

const createLocationDto = z.object({
  address: z.string().min(3).max(100),
  city: z.string().min(3).max(50),
  state: z.string().min(3).max(50),
  pincode: z.coerce.number(),
});
const editLocation = createLocationDto.partial();
const locationDto = createLocationDto.extend({
  id: z.string().uuid(),
});
const userlocations = createuserResponse.extend({
  locations: z.array(locationDto),
});

const locationsarray = userlocations.pick({ locations: true });
const userResponse = createuserResponse.extend({
  locations: z.array(locationDto),
  creationDate: z.date(),
});
type locationsarrayType = z.infer<typeof locationsarray>;
type locationType = z.infer<typeof locationDto>;
type createLocationType = z.infer<typeof createLocationDto>;

type userlocationsType = z.infer<typeof userlocations>;

type editLocationType = z.infer<typeof editLocation>;
type userResponseType = z.infer<typeof userResponse>;
export {
  createLocationDto,
  locationDto,
  editLocation,
  userlocations,
  locationsarray,
  userResponse,
};

export type {
  createLocationType,
  userResponseType,
  locationType,
  editLocationType,
  userlocationsType,
  locationsarrayType,
};
