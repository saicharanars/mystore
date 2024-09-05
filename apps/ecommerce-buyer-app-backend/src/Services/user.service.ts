import { Product, User } from '@ecommerce/db-postgres';
import { createuser } from '@ecommerce/types';

async function findUserByEmail(email: string) {
  try {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  } catch (error) {
    throw new Error(`Error finding user by email: ${error.message}`);
  }
}
async function finduserbyId(id: string) {
  try {
    return await User.findOne({
      where: {
        id: id,
      },
      include: [Product],
    });
  } catch (error) {
    throw new Error(`Error finding user by email: ${error.message}`);
  }
}

async function createUser(createUser: createuser) {
  try {
    return await User.create(createUser);
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

async function removeUser({ id, email }: { id?: string; email?: string }) {
  try {
    if (!id && !email) {
      throw new Error(
        'You must provide either an id or email to delete a user.'
      );
    }

    // Construct the deletion criteria based on provided arguments
    const deleteCriteria = id ? { id } : { email };

    // Perform the deletion
    const result = await User.destroy({
      where: deleteCriteria,
    });

    if (result === 0) {
      throw new Error('No user found with the provided criteria.');
    }

    return result;
  } catch (error) {
    console.error('Error deleting user:', error.message);
    throw new Error(`Failed to delete user: ${error.message}`);
  }
}

export { findUserByEmail, finduserbyId, createUser, removeUser };
