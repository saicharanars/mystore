import {
  createshipmentType,
  paginationType,
  ProductType,
  shipmentType,
} from '@ecommerce/types';
import { ApiError } from '../utils/apierror';
import { StatusCodes } from 'http-status-codes';
import { FilterQuery } from 'mongoose';
import Shipment from '../models/shipment.model';

class ShipmentService {
  async createShipment(
    createshipment: createshipmentType,
    userId: string
  ): Promise<ProductType> {
    const shipmentData = { ...createshipment, userId };

    const shipment = new Shipment(shipmentData);
    const result = await shipment.save();
    const savedshipment = result as shipmentType;
    if (savedshipment === null) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to create shipment'
      );
    }
    return savedshipment;
  }

  async getShipmenById(shipmentId: string): Promise<shipmentType | null> {
    const result = (await Shipment.findOne({
      _id: shipmentId,
    })) as shipmentType;
    console.log(result, 'from shipment service');
    if (!result) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'shipment not found');
    }
    return result;
  }
  async getShipmenByOrderId(orderId: string): Promise<shipmentType | null> {
    const result = (await Shipment.findOne({
      orderId: orderId,
    })) as shipmentType;
    console.log(result, 'from shipment service');
    if (!result) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'shipment not found');
    }
    return result;
  }
  async updateShipment(
    shipmentId: string,
    shipmentData: Partial<shipmentType>,
    userId: string
  ): Promise<shipmentType | null> {
    console.log(shipmentId, shipmentData, userId, '>>>> service');

    const shipmentr = await Shipment.findOneAndUpdate(
      { _id: shipmentId, userId: userId },
      shipmentData,
      { new: true }
    );
    const updatedShipment = shipmentr as shipmentType;

    if (!updatedShipment) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found');
    }

    return updatedShipment;
  }

  async deleteShipment(shipmentId: string, userId: string) {
    console.log(shipmentId, userId);
    const deleteshipment = await Shipment.findOneAndDelete(
      {
        _id: shipmentId,
        userId: userId,
      },
      {
        projection: {
          _id: true,
        },
      }
    );

    return deleteshipment;
  }

  async findAllShipmentss(pagination: paginationType, userid?: string) {
    const { offset, limit } = pagination;

    const whereClause: FilterQuery<{ userid: string }> = {};

    if (userid) {
      whereClause.userId = userid;
    }

    const [items, count] = await Promise.all([
      Shipment.find(whereClause)
        .skip(parseInt(offset) || 0)
        .limit(parseInt(limit) || 10),
      Shipment.countDocuments(whereClause),
    ]);
    if (!items || !count) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        'Shipments with these cpnditions not found'
      );
    }

    const res = { items, count };
    console.log(res);
    return res;
  }
}

export default new ShipmentService();
