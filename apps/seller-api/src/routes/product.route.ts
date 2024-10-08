import express, { Router } from 'express';
import { asyncHandler } from '../utils/asynchandler';
import productController from '../controllers/product.controller';
import { validateRequest } from '../middleware/validation';
import {
  createProductSchema,
  editProduct,
  productFilters,
} from '@ecommerce/types';
import { Authorization } from '../middleware/authorization';
import { z } from 'zod';
import MediaService from '../services/media.service';
import MediaController from '../controllers/media.controller';
import multer from 'multer';
import { ApiError } from '../utils/apierror';
import { StatusCodes } from 'http-status-codes';

class ProductRoutes {
  public router: Router;
  private mediaService: MediaService;
  private upload: multer.Multer;
  constructor() {
    this.router = express.Router();
    this.mediaService = new MediaService();
    this.upload = multer({
      limits: {
        fieldSize: 5 * 1024 * 1024,
      },
      fileFilter: this.imageFileFilter,
    });
    this.initializeRoutes();
  }
  private imageFileFilter(
    req: Express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(new ApiError(StatusCodes.CONFLICT, 'Only images are allowed!')); // Reject the file
    }
  }
  private initializeRoutes(): void {
    this.router.get(
      '/findproducts/',
      Authorization('seller'),

      validateRequest({
        query: productFilters.partial(),
      }),
      asyncHandler(productController.getAllProductsBySeller)
    );
    this.router.post(
      '/',
      Authorization('seller'),
      validateRequest({ body: createProductSchema }),
      asyncHandler(productController.create)
    );

    this.router.post(
      '/images/',
      Authorization('seller'),
      this.upload.array('images', 10),
      asyncHandler(MediaController.create)
    );

    this.router.get(
      '/:productid',
      validateRequest({
        params: z.object({
          productid: z.string().uuid(),
        }),
      }),
      asyncHandler(productController.getById)
    );
    this.router.patch(
      '/:productid',
      Authorization('seller'),
      validateRequest({
        params: z.object({
          productid: z.string().uuid(),
        }),
        body: editProduct,
      }),
      asyncHandler(productController.update)
    );
    this.router.delete(
      '/:productid',
      Authorization('seller'),
      validateRequest({
        params: z.object({
          productid: z.string().uuid(),
        }),
      }),
      asyncHandler(productController.delete)
    );
  }
}

export default new ProductRoutes().router;
