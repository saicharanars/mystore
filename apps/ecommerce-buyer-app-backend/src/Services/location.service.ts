import {
  createLocationType,
  editLocationType,
  locationDto,
  userlocations,
} from '@ecommerce/types';
import { Location, User, UserLocation } from '@ecommerce/db-postgres';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils/apierrorclass';

async function createLocation(
  createlocation: createLocationType,
  userId: string
) {
  const { address, city, state, pincode } = createlocation;

  const location = await Location.create({
    address,
    city,
    state,
    pincode,
  });
  if (!location) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to create location'
    );
  }

  const userlocation = await UserLocation.create({
    userId,
    locationId: location.id,
  });
  if (!userlocation) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to associate user with location'
    );
  }
  const data = locationDto.parse(location);

  return { data, userlocation: true };
}

async function editLocation(
  editLocation: editLocationType,
  locationId: string,
  userId: string
) {
  console.log(locationId, '>>>>>>>>', userId, locationId);

  const findlocation = await UserLocation.findOne({
    where: {
      locationId,
    },
  });
  console.log(findLocation, '>>>>>>>>>>>');
  if (!findlocation) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      getReasonPhrase(StatusCodes.NOT_FOUND)
    );
  }
  if (findlocation.userId !== userId) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      getReasonPhrase(StatusCodes.UNAUTHORIZED)
    );
  }
  const [updatedcount, updatedlocation] = await Location.update(editLocation, {
    where: {
      id: locationId,
    },
    returning: true,
  });
  if (updatedcount === 0) {
    throw new ApiError(
      StatusCodes.NOT_MODIFIED,
      'No changes were made to the location'
    );
  }
  const editedlocation = locationDto.parse(updatedlocation[0]);

  return editedlocation;
}
async function deleteLocation(locationId: string, userId: string) {
  const findlocation = await UserLocation.findOne({
    where: {
      locationId,
    },
  });
  if (!findlocation) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      getReasonPhrase(StatusCodes.NOT_FOUND)
    );
  }
  if (findlocation.userId !== userId) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      getReasonPhrase(StatusCodes.UNAUTHORIZED)
    );
  }
  const deleteuserlocation = await findlocation.destroy();
  const deletelocation = await Location.destroy({
    where: {
      id: locationId,
    },
  });
  return deletelocation;
}
async function findLocation(locationId: string) {
  const findlocation = await Location.findOne({
    where: {
      id: locationId,
    },
  });
  if (!findlocation) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      getReasonPhrase(StatusCodes.NOT_FOUND)
    );
  }
  const location = locationDto.parse(findlocation);

  return location;
}
async function findUserLocations(userId: string) {
  const finduserlocation = await User.findOne({
    where: {
      id: userId,
    },
    include: [
      {
        attributes: ['id', 'address', 'city', 'state', 'pincode'],
        model: Location,
      },
    ],
    limit: 10,
  });
  if (!finduserlocation) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      getReasonPhrase(StatusCodes.NOT_FOUND)
    );
  }

  const userlocation = await userlocations.parse(finduserlocation);

  return userlocation;
}

export {
  createLocation,
  editLocation,
  findLocation,
  findUserLocations,
  deleteLocation,
};
