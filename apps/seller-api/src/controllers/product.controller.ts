import {
  productFilterType,
  ProductSchemaZod,
  ProductsResponse,
  usertokentype,
} from '@ecommerce/types';
import ProductService from '../services/product.service';
import { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import MediaService from '../services/media.service';

class ProductController {
  private mediaService: MediaService;
  constructor() {
    this.mediaService = new MediaService();
  }
  create = async (req: Request, res: Response): Promise<Response> => {
    const usertoken: usertokentype = req['user'];
    const userid = usertoken.id;
    const productbody = req.body;
    const product = await ProductService.createProduct(productbody, userid);
    console.log('Product data:', product);
    console.log(ProductSchemaZod.partial().parse(product));

    return res.status(StatusCodes.CREATED).json({
      data: ProductSchemaZod.parse(product),
      message: getReasonPhrase(StatusCodes.CREATED),
    });
  };

  async getById(req: Request, res: Response): Promise<Response> {
    const product = await ProductService.getProductById(req.params.productid);
    return res.status(StatusCodes.OK).json({
      data: ProductSchemaZod.parse(product),
      message: getReasonPhrase(StatusCodes.OK),
    });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const usertoken: usertokentype = req['user'];
    const data = req.body;
    const productid = req.params.productid;

    console.log(data, '>>>>>>>>', usertoken, req.params);
    const product = await ProductService.updateProduct(
      productid,
      req.body,
      usertoken.id
    );

    return res.status(StatusCodes.CREATED).json({
      data: ProductSchemaZod.parse(product),
      message: getReasonPhrase(StatusCodes.CREATED),
    });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const usertoken: usertokentype = req['user'];
    const productid = req.params.productid;
    const deletedproduct = await ProductService.deleteProduct(
      productid,
      usertoken.id
    );
    if (deletedproduct) {
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: getReasonPhrase(StatusCodes.CREATED),
      });
    } else {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: getReasonPhrase(StatusCodes.NOT_FOUND),
      });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const filters: productFilterType = req.query;
    const products = await ProductService.findAllProducts(filters);
    return res.status(StatusCodes.OK).json({
      data: products,
      message: getReasonPhrase(StatusCodes.OK),
    });
  }
  async getAllProductsBySeller(req: Request, res: Response): Promise<Response> {
    const usertoken: usertokentype = req['user'];
    const filters: productFilterType = req.query;
    console.log(usertoken);
    const products = await ProductService.findAllProducts(
      filters,
      usertoken.id
    );
    return res.status(StatusCodes.OK).json({
      data: ProductsResponse.parse(products),
      message: getReasonPhrase(StatusCodes.OK),
    });
  }
}
export default new ProductController();
