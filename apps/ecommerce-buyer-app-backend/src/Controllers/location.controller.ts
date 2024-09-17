import {
  createLocationType,
  editLocationType,
  usertokentype,
} from '@ecommerce/types';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import {
  createLocation,
  deleteLocation,
  editLocation,
  findLocation,
  findUserLocations,
} from '../Services/location.service';
import { Request, Response } from 'express';

const addLocation = async (req: Request, res: Response) => {
  const body: createLocationType = req.body;

  const usertoken: usertokentype = req['user'];
  console.log(body, usertoken);
  const addlocation = await createLocation(body, usertoken.id);
  res.status(StatusCodes.CREATED).json({
    data: addlocation,
    message: getReasonPhrase(StatusCodes.CREATED),
  });
};
const updateLocation = async (req: Request, res: Response) => {
  const body: editLocationType = req.body;
  const locationId: string = req.params.locationId;
  const usertoken: usertokentype = req['user'];
  console.log(locationId, '>>>>>>>>', body, locationId);

  const Updatelocation = await editLocation(body, locationId, usertoken.id);
  res.status(StatusCodes.CREATED).json({
    data: Updatelocation,
    message: getReasonPhrase(StatusCodes.CREATED),
  });
};
const removeLocation = async (req: Request, res: Response) => {
  const locationId: string = req.params.locationId;
  const usertoken: usertokentype = req['user'];

  const removelocation = await deleteLocation(locationId, usertoken.id);
  res.status(StatusCodes.CREATED).json({
    data: removelocation,
    message: getReasonPhrase(StatusCodes.CREATED),
  });
};

const getLocation = async (req: Request, res: Response) => {
  const locationId: string = req.params.locationId;

  const location = await findLocation(locationId);
  res.status(StatusCodes.CREATED).json({
    data: location,
    message: getReasonPhrase(StatusCodes.CREATED),
  });
};
const getUserLocations = async (req: Request, res: Response) => {
  const usertoken: usertokentype = req['user'];
  console.log(usertoken);
  const location = await findUserLocations(usertoken.id);
  res.status(StatusCodes.CREATED).json({
    data: location,
    message: getReasonPhrase(StatusCodes.CREATED),
  });
};

export {
  addLocation,
  getLocation,
  updateLocation,
  getUserLocations,
  removeLocation,
};
