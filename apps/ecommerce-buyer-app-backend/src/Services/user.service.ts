import { User, Location } from '@ecommerce/db-postgres';
import { createuser, userlocations, userResponse } from '@ecommerce/types';
import { ApiError } from '../utils/apierrorclass';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

async function findUserByEmail(email: string) {
  return await User.findOne({
    where: {
      email: email,
    },
  });
}
async function finduserbyId(userId: string) {
  const finduser = await User.findOne({
    where: {
      id: userId,
    },
    include: [
      {
        attributes: ['id', 'address', 'city', 'state', 'pincode'],
        model: Location,
      },
    ],
    attributes: ['id', 'creationDate', 'name', 'email', 'role'],
  });
  if (!finduser) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      getReasonPhrase(StatusCodes.NOT_FOUND)
    );
  }

  const user = userResponse.parse(finduser);

  return user;
}

async function createUser(createUser: createuser) {
  return await User.create(createUser);
}

async function removeUser({ id, email }: { id?: string; email?: string }) {
  if (!id && !email) {
    throw new Error('You must provide either an id or email to delete a user.');
  }

  const deleteCriteria = id ? { id } : { email };

  const result = await User.destroy({
    where: deleteCriteria,
  });

  if (result === 0) {
    throw new Error('No user found with the provided criteria.');
  }

  return result;
}

export { findUserByEmail, finduserbyId, createUser, removeUser };
