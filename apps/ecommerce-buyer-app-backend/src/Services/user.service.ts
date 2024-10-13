import { User, Location } from '@ecommerce/db-postgres';
import { createuser } from '@ecommerce/types';

async function findUserByEmail(email: string) {
  return await User.findOne({
    where: {
      email: email,
    },
  });
}
async function finduserbyId(id: string) {
  const user = await User.findOne({
    where: {
      id: id,
    },
    include: [
      {
        attributes: ['id', 'address', 'city', 'state', 'pincode'],
        model: Location,
      },
    ],
  });
  if (!user) {
    return null;
  }
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
