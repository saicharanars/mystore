// services/ProductService.ts

import Product from '../models/product.model'; // Assume you have a Mongoose model
import {
  CreateProductType,
  productFiltersServiceType,
  productFilterType,
  ProductType,
} from '@ecommerce/types';
import { ApiError } from '../utils/apierror';
import { StatusCodes } from 'http-status-codes';
import { FilterQuery } from 'mongoose';

class ProductService {
  async createProduct(
    createproduct: CreateProductType,
    userId: string
  ): Promise<ProductType> {
    const productData = { ...createproduct, userId };

    const product = new Product(productData);
    const result = await product.save();
    if (result === null) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to create product'
      );
    }
    return result;
  }

  async getProductById(productId: string): Promise<ProductType | null> {
    const result = await Product.findOne({ _id: productId });
    console.log(result, 'from product service');
    if (!result) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found');
    }
    return result;
  }

  async updateProduct(
    productId: string,
    productData: Partial<ProductType>,
    userId: string
  ): Promise<ProductType | null> {
    console.log(productId, productData, userId, '>>>> service');

    const product = await Product.findOneAndUpdate(
      { _id: productId, userId: userId },
      productData,
      { new: true }
    );

    if (!product) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found');
    }

    return product;
  }

  async deleteProduct(productId: string, userId: string) {
    console.log(productId, userId);
    const deleteproduct = await Product.findOneAndDelete(
      {
        _id: productId,
        userId: userId,
      },
      {
        projection: {
          _id: true,
        },
      }
    );

    return deleteproduct;
  }

  async findAllProducts(filters: productFilterType) {
    const { category, tags, minprice, maxprice, skip, limit } = filters;

    const whereClause: FilterQuery<productFilterType> = {};
    if (category) {
      whereClause.category = category;
    }

    if (tags && tags.length > 0) {
      whereClause.tags = { $in: tags };
    }

    if (minprice || maxprice) {
      whereClause.price = {};
      if (minprice) {
        whereClause.price.$gte = parseInt(minprice);
      }
      if (maxprice) {
        whereClause.price.$lte = parseInt(maxprice);
      }
    }

    const [rows, count] = await Promise.all([
      Product.find(whereClause)
        .skip(parseInt(skip) || 0)
        .limit(parseInt(limit) || 10),
      Product.countDocuments(whereClause),
    ]);
    if (!rows || !count) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        'products with these cpnditions not found'
      );
    }

    const res = { rows, count };
    console.log(res);
    return res;
  }
}

export default new ProductService();