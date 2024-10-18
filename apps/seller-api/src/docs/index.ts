import * as yaml from 'yaml';
import * as fs from 'fs';
import * as path from 'path';
import { z } from 'zod';
import {
  extendZodWithOpenApi,
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';
import {
  validationerrorSchema,
  errorschema,
  productFilters,
  ProductsResponse,
  createshipment,
  editshipment,
  pagination,
  createProductSchema,
  editProduct,
  ProductSchemaZod,
  shipmentsResponse,
  shipmentschema,
} from '@ecommerce/types';

extendZodWithOpenApi(z);

const sellerapi = new OpenAPIRegistry();

const bearerAuth = sellerapi.registerComponent(
  'securitySchemes',
  'bearerAuth',
  {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  }
);

sellerapi.registerPath({
  method: 'get',
  path: '/product/findproducts',
  description: 'Get products of route route',
  summary: 'Get products by seller',
  request: {
    query: productFilters.partial(),
  },
  responses: {
    200: {
      description: 'Products response',
      content: {
        'application/json': {
          schema: z.object({
            data: ProductsResponse,
            message: z.string(),
          }),
        },
      },
    },
    404: {
      description: 'products not found',
      content: {
        'application/json': {
          schema: z.object({
            error: z
              .string()
              .openapi({ example: 'products with these cpnditions not found' }),
          }),
        },
      },
    },
    400: {
      description: 'Error occurred in body, params, or query',
      content: {
        'application/json': {
          schema: validationerrorSchema,
        },
      },
    },
    500: {
      description: 'Error occurred internally',
      content: {
        'application/json': {
          schema: errorschema,
        },
      },
    },
  },
});

sellerapi.registerPath({
  method: 'post',
  path: '/product/',
  description: 'Create a new product',
  summary: 'Create a new product',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createProductSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Product created successfully',
      content: {
        'application/json': {
          schema: z.object({
            data: ProductSchemaZod,
            message: z.string(),
          }),
        },
      },
    },
    400: {
      description: 'Error occurred in body, params, or query',
      content: {
        'application/json': {
          schema: validationerrorSchema,
        },
      },
    },
    500: {
      description: 'Error occurred internally',
      content: {
        'application/json': {
          schema: errorschema,
        },
      },
    },
  },
});

sellerapi.registerPath({
  method: 'post',
  path: '/product/images/',
  description: 'Upload product images',
  summary: 'Upload product images',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({
            images: z.array(z.any()),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Images uploaded successfully',
      content: {
        'application/json': {
          schema: z.object({
            data: z.array(z.string()),
            message: z.string(),
          }),
        },
      },
    },
    400: {
      description: 'Error occurred in body, params, or query',
      content: {
        'application/json': {
          schema: validationerrorSchema,
        },
      },
    },
    500: {
      description: 'Error occurred internally',
      content: {
        'application/json': {
          schema: errorschema,
        },
      },
    },
  },
});

sellerapi.registerPath({
  method: 'get',
  path: '/product/:productid',
  description: 'Get product by ID',
  summary: 'Get product by ID',
  request: {
    params: z.object({
      productid: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: 'Product found',
      content: {
        'application/json': {
          schema: z.object({
            data: ProductsResponse,
            message: z.string(),
          }),
        },
      },
    },
    404: {
      description: 'product not found',
      content: {
        'application/json': {
          schema: z.object({
            error: z
              .string()
              .openapi({ example: 'product with these id not found' }),
          }),
        },
      },
    },
    400: {
      description: 'Error occurred in body, params, or query',
      content: {
        'application/json': {
          schema: validationerrorSchema,
        },
      },
    },
    500: {
      description: 'Error occurred internally',
      content: {
        'application/json': {
          schema: errorschema,
        },
      },
    },
  },
});

sellerapi.registerPath({
  method: 'patch',
  path: '/product/:productid',
  description: 'Update product by ID',
  summary: 'Update product by ID',
  request: {
    params: z.object({
      productid: z.string().uuid(),
    }),
    body: {
      content: {
        'application/json': {
          schema: editProduct,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Product updated successfully',
      content: {
        'application/json': {
          schema: z.object({
            data: ProductSchemaZod,
            message: z.string(),
          }),
        },
      },
    },
    400: {
      description: 'Error occurred in body, params, or query',
      content: {
        'application/json': {
          schema: validationerrorSchema,
        },
      },
    },
    404: {
      description: 'product not found',
      content: {
        'application/json': {
          schema: z.object({
            error: z
              .string()
              .openapi({ example: 'product with these id not found' }),
          }),
        },
      },
    },
    500: {
      description: 'Error occurred internally',
      content: {
        'application/json': {
          schema: errorschema,
        },
      },
    },
  },
});

sellerapi.registerPath({
  method: 'delete',
  path: '/product/:productid',
  description: 'Delete product by ID',
  summary: 'Delete product by ID',
  request: {
    params: z.object({
      productid: z.string().uuid(),
    }),
  },
  responses: {
    201: {
      description: 'Product deleted successfully',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            message: z.string(),
          }),
        },
      },
    },
    404: {
      description: 'product not found',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            error: z
              .string()
              .openapi({ example: 'product with these id not found' }),
          }),
        },
      },
    },
    400: {
      description: 'Error occurred in body, params, or query',
      content: {
        'application/json': {
          schema: validationerrorSchema,
        },
      },
    },
    500: {
      description: 'Error occurred internally',
      content: {
        'application/json': {
          schema: errorschema,
        },
      },
    },
  },
});

sellerapi.registerPath({
  method: 'get',
  path: '/shipment/',
  description: 'Get all shipments by seller',
  summary: 'Get all shipments by seller',
  request: {
    query: pagination,
  },
  responses: {
    200: {
      description: 'Shipments found',
      content: {
        'application/json': {
          schema: z.object({
            data: shipmentsResponse,
            message: z.string(),
          }),
        },
      },
    },
    400: {
      description: 'Error occurred in body, params, or query',
      content: {
        'application/json': {
          schema: validationerrorSchema,
        },
      },
    },
    404: {
      description: 'shipments not found',
      content: {
        'application/json': {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: 'shipments with these id not found' }),
          }),
        },
      },
    },
    500: {
      description: 'Error occurred internally',
      content: {
        'application/json': {
          schema: errorschema,
        },
      },
    },
  },
});

sellerapi.registerPath({
  method: 'post',
  path: '/shipment/',
  description: 'Create a new shipment',
  summary: 'Create a new shipment',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createshipment,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Shipment created successfully',
      content: {
        'application/json': {
          schema: z.object({
            data: shipmentschema,
            message: z.string(),
          }),
        },
      },
    },
    400: {
      description: 'Error occurred in body, params, or query',
      content: {
        'application/json': {
          schema: validationerrorSchema,
        },
      },
    },
    500: {
      description: 'Error occurred internally',
      content: {
        'application/json': {
          schema: errorschema,
        },
      },
    },
  },
});

sellerapi.registerPath({
  method: 'get',
  path: '/shipment/:shipmentid',
  description: 'Get shipment by ID',
  summary: 'Get shipment by ID',
  request: {
    params: z.object({
      shipmentid: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: 'Shipment found',
      content: {
        'application/json': {
          schema: z.object({
            data: shipmentschema,
            message: z.string(),
          }),
        },
      },
    },
    404: {
      description: 'shipment not found',
      content: {
        'application/json': {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: 'shipment with these id not found' }),
          }),
        },
      },
    },
    400: {
      description: 'Error occurred in body, params, or query',
      content: {
        'application/json': {
          schema: validationerrorSchema,
        },
      },
    },
    500: {
      description: 'Error occurred internally',
      content: {
        'application/json': {
          schema: errorschema,
        },
      },
    },
  },
});

sellerapi.registerPath({
  method: 'get',
  path: '/shipment/order/:orderid',
  description: 'Get shipment by order ID',
  summary: 'Get shipment by order ID',
  request: {
    params: z.object({
      orderid: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: 'Shipment found',
      content: {
        'application/json': {
          schema: z.object({
            data: createshipment,
            message: z.string(),
          }),
        },
      },
    },
    404: {
      description: 'shipment not found',
      content: {
        'application/json': {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: 'shipments with these orderid not found' }),
          }),
        },
      },
    },
    400: {
      description: 'Error occurred in body, params, or query',
      content: {
        'application/json': {
          schema: validationerrorSchema,
        },
      },
    },
    500: {
      description: 'Error occurred internally',
      content: {
        'application/json': {
          schema: errorschema,
        },
      },
    },
  },
});

sellerapi.registerPath({
  method: 'patch',
  path: '/shipment/:shipmentid',
  description: 'Update shipment by ID',
  summary: 'Update shipment by ID',
  request: {
    params: z.object({
      shipmentid: z.string().uuid(),
    }),
    body: {
      content: {
        'application/json': {
          schema: editshipment,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Shipment updated successfully',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    404: {
      description: 'shipments not found',
      content: {
        'application/json': {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: 'shipments with these id not found' }),
          }),
        },
      },
    },
    400: {
      description: 'Error occurred in body, params, or query',
      content: {
        'application/json': {
          schema: validationerrorSchema,
        },
      },
    },
    500: {
      description: 'Error occurred internally',
      content: {
        'application/json': {
          schema: errorschema,
        },
      },
    },
  },
});

sellerapi.registerPath({
  method: 'delete',
  path: '/shipment/:shipmentid',
  description: 'Delete shipment by ID',
  summary: 'Delete shipment by ID',
  request: {
    params: z.object({
      shipmentid: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: 'Shipment deleted successfully',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    404: {
      description: 'shipment not found',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            error: z
              .string()
              .openapi({ example: 'shipment with these id not found' }),
          }),
        },
      },
    },
    400: {
      description: 'Error occurred in body, params, or query',
      content: {
        'application/json': {
          schema: validationerrorSchema,
        },
      },
    },
    500: {
      description: 'Error occurred internally',
      content: {
        'application/json': {
          schema: errorschema,
        },
      },
    },
  },
});

function getOpenApiDocumentation() {
  const generator = new OpenApiGeneratorV3(sellerapi.definitions);
  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Seller API Mystore',
      description: 'This is the Documementation for Mystore  Seller API  ',
    },
    servers: [{ url: process.env.BACKEND_URL }],
  });
}

function writeDocumentation() {
  const docs = getOpenApiDocumentation();
  const fileContent = yaml.stringify(docs);
  const outputPath = path.join(__dirname, '../docs/openapi-docs.yaml');
  fs.writeFile(outputPath, fileContent, { encoding: 'utf-8' }, (err) => {
    if (err) {
      console.error('Failed to write the OpenAPI documentation:', err);
    } else {
      console.log(
        'OpenAPI documentation has been successfully written to',
        outputPath
      );
    }
  });
}

export { writeDocumentation };
