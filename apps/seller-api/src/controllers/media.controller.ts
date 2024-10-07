import { usertokentype } from '@ecommerce/types';
import { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import MediaService from '../services/media.service';

class MediaController {
  private mediaService: MediaService;
  constructor() {
    this.mediaService = new MediaService();
  }
  create = async (req: Request, res: Response): Promise<Response> => {
    const usertoken: usertokentype = req['user'];
    const userid = usertoken.id;
    const files = req.files as Express.Multer.File[];
    console.log(files, 'files in controller');
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const uploadResult = await this.mediaService.saveFile(file, userid);
        console.log(uploadResult, 'fgjij');
        return uploadResult.url;
      })
    );

    return res.status(StatusCodes.CREATED).json({
      data: uploadedFiles,
      message: getReasonPhrase(StatusCodes.CREATED),
    });
  };

  // async getById(req: Request, res: Response): Promise<Response> {
  //   const product = await ProductService.getProductById(req.params.productid);
  //   return res.status(StatusCodes.OK).json({
  //     data: ProductSchemaZod.parse(product),
  //     message: getReasonPhrase(StatusCodes.OK),
  //   });
  // }

  // async update(req: Request, res: Response): Promise<Response> {
  //   const usertoken: usertokentype = req['user'];
  //   const data = req.body;
  //   const productid = req.params.productid;

  //   console.log(data, '>>>>>>>>', usertoken, req.params);
  //   const product = await ProductService.updateProduct(
  //     productid,
  //     req.body,
  //     usertoken.id
  //   );

  //   return res.status(StatusCodes.CREATED).json({
  //     data: product,
  //     message: getReasonPhrase(StatusCodes.CREATED),
  //   });
  // }

  // async delete(req: Request, res: Response): Promise<Response> {
  //   const usertoken: usertokentype = req['user'];
  //   const productid = req.params.productid;
  //   const deletedproduct = await ProductService.deleteProduct(
  //     productid,
  //     usertoken.id
  //   );
  //   if (deletedproduct) {
  //     return res.status(StatusCodes.CREATED).json({
  //       sucess: true,
  //       message: getReasonPhrase(StatusCodes.CREATED),
  //     });
  //   } else {
  //     return res.status(StatusCodes.NOT_FOUND).json({
  //       sucess: false,
  //       message: getReasonPhrase(StatusCodes.NOT_FOUND),
  //     });
  //   }
  // }

  // async getAll(req: Request, res: Response): Promise<Response> {
  //   const filters: productFilterType = req.query;
  //   const products = await ProductService.findAllProducts(filters);
  //   return res.status(StatusCodes.OK).json({
  //     data: products,
  //     message: getReasonPhrase(StatusCodes.OK),
  //   });
  // }
}
export default new MediaController();
