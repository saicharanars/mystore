import { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { usertokentype } from '@ecommerce/types';
import { finduserbyId } from '../Services/user.service';

const getUserDetails = async (req: Request, res: Response) => {
  const usertoken: usertokentype = req['user'];
  console.log(usertoken);
  const user = await finduserbyId(usertoken.id);
  res.status(StatusCodes.CREATED).json({
    data: user,
    message: getReasonPhrase(StatusCodes.CREATED),
  });
};

export { getUserDetails };
