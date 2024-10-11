import express, { Router } from 'express';
import { asyncHandler } from '../utils/asynchandler';
import { validateRequest } from '../middleware/validation';
import { createshipment, editshipment, pagination } from '@ecommerce/types';
import { Authorization } from '../middleware/authorization';
import shipmentController from '../controllers/shipment.controller';
import { z } from 'zod';

class ShipmentRoutes {
  public router: Router;

  constructor() {
    this.router = express.Router();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/',
      Authorization('seller'),

      validateRequest({
        query: pagination,
      }),
      asyncHandler(shipmentController.getAllShipmentsBySeller)
    );
    this.router.post(
      '/',
      Authorization('seller'),
      validateRequest({ body: createshipment }),
      asyncHandler(shipmentController.create)
    );
    this.router.get(
      '/:shipmentid',
      validateRequest({
        params: z.object({
          shipmentid: z.string().uuid(),
        }),
      }),
      asyncHandler(shipmentController.getById)
    );
    this.router.patch(
      '/:shipmentid',
      Authorization('seller'),
      validateRequest({
        params: z.object({
          shipmentid: z.string().uuid(),
        }),
        body: editshipment,
      }),
      asyncHandler(shipmentController.update)
    );
    this.router.delete(
      '/:shipmentid',
      Authorization('seller'),
      validateRequest({
        params: z.object({
          shipmentid: z.string().uuid(),
        }),
      }),
      asyncHandler(shipmentController.delete)
    );
  }
}

export default new ShipmentRoutes().router;
