import {
  paginationType,
  productFilterType,
  ProductSchemaZod,
  shipmentschema,
  usertokentype,
} from '@ecommerce/types';
import ProductService from '../services/product.service';
import { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import MediaService from '../services/media.service';
import shipmentService from '../services/shipment.service';

class ShipmentController {
  private mediaService: MediaService;
  constructor() {
    this.mediaService = new MediaService();
  }
  create = async (req: Request, res: Response): Promise<Response> => {
    const usertoken: usertokentype = req['user'];
    const userid = usertoken.id;
    const shipmenttbody = req.body;
    const shipment = await shipmentService.createShipment(
      shipmenttbody,
      userid
    );
    console.log('shipment data:', shipment);
    console.log(shipmentschema.parse(shipment));

    return res.status(StatusCodes.CREATED).json({
      data: shipmentschema.parse(shipment),
      message: getReasonPhrase(StatusCodes.CREATED),
    });
  };

  async getById(req: Request, res: Response): Promise<Response> {
    const shipment = await shipmentService.getShipmenById(
      req.params.shipmentid
    );
    return res.status(StatusCodes.OK).json({
      data: shipmentschema.parse(shipment),
      message: getReasonPhrase(StatusCodes.OK),
    });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const usertoken: usertokentype = req['user'];
    const data = req.body;
    const shipmentid = req.params.shipmentid;

    console.log(data, '>>>>>>>>', usertoken, req.params);
    const shipment = await shipmentService.updateShipment(
      shipmentid,
      req.body,
      usertoken.id
    );

    return res.status(StatusCodes.CREATED).json({
      data: shipmentschema.parse(shipment),
      message: getReasonPhrase(StatusCodes.CREATED),
    });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const usertoken: usertokentype = req['user'];
    const shipmentid = req.params.shipmentid;
    const deletedshipment = await shipmentService.deleteShipment(
      shipmentid,
      usertoken.id
    );
    if (deletedshipment) {
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: getReasonPhrase(StatusCodes.CREATED),
      });
    } else {
      return res.status(StatusCodes.NOT_FOUND).json({
        sucess: false,
        message: getReasonPhrase(StatusCodes.NOT_FOUND),
      });
    }
  }

  async getAllShipmentsBySeller(
    req: Request,
    res: Response
  ): Promise<Response> {
    const usertoken: usertokentype = req['user'];
    const pagination: paginationType = req.query;
    console.log(usertoken);
    const shipments = await shipmentService.findAllShipmentss(
      pagination,
      usertoken.id
    );
    return res.status(StatusCodes.OK).json({
      data: shipments,
      message: getReasonPhrase(StatusCodes.OK),
    });
  }
}
export default new ShipmentController();
