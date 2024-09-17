import {
  createProductType,
  deleteproductResponse,
  editProductDto,
  productResponse,
  productsFiltersType,
  productsResponse,
  usertokentype,
} from '@ecommerce/types';
import { Request, Response } from 'express';
import {
  createProduct,
  deleteProduct,
  editProduct,
  findAllProducts,
  findById,
} from '../Services/product.service';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

const createproduct = async (req: Request, res: Response) => {
  const product: createProductType = req.body;
  const usertoken: usertokentype = req['user'];
  const result = await createProduct(product, usertoken.id);
  const safeUserData = productResponse.parse(result);

  res.status(StatusCodes.CREATED).json({
    data: safeUserData,
    message: getReasonPhrase(StatusCodes.CREATED),
  });
};

const deleteproduct = async (req: Request, res: Response) => {
  const product: string = req.params.productId;
  const usertoken: usertokentype = req['user'];
  const result = await deleteProduct(product, usertoken.id);
  if (result === null) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: {
        message: 'Product not found',
      },
    });
  } else if (result === 'notowner') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'you are not owner',
    });
  }
  const safeUserData = deleteproductResponse.parse(result);

  res.status(StatusCodes.OK).json({
    data: safeUserData,
    message: getReasonPhrase(StatusCodes.OK),
  });
};
const editproduct = async (req: Request, res: Response) => {
  console.log('editproduct handler called');
  const parsedProduct = editProductDto.parse(req.body);
  const productid: string = req.params.productId;
  const usertoken: usertokentype = req['user'];

  const result = await editProduct(parsedProduct, usertoken.id, productid);
  if (result === null) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Product not found',
    });
  } else if (result === 'notowner') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'you are not owner',
    });
  }
  console.log(result);
  const safeUserData = productResponse.parse(result);

  res.status(StatusCodes.CREATED).json({
    data: safeUserData,
    message: getReasonPhrase(StatusCodes.CREATED),
  });
};
const findallproducts = async (req: Request, res: Response) => {
  const filters: productsFiltersType = req.query;
  let tags;
  if (filters && filters.tags) {
    tags = filters.tags.split(',');
  }
  const updatedfilters = { ...filters, tags };
  console.log(filters, tags);
  const result = await findAllProducts(updatedfilters);
  const safeUserData = productsResponse.parse(result);

  res.status(StatusCodes.OK).json({
    data: safeUserData,
    message: getReasonPhrase(StatusCodes.OK),
  });
};
const findProduct = async (req: Request, res: Response) => {
  const productId: string = req.params.productId;

  const result = await findById(productId);
  if (result === null) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'Product not found',
    });
  }
  console.log(result);
  const safeUserData = productResponse.parse(result);

  res.status(StatusCodes.OK).json({
    data: safeUserData,
    message: getReasonPhrase(StatusCodes.OK),
  });
};

export {
  createproduct,
  editproduct,
  deleteproduct,
  findProduct,
  findallproducts,
};
