import * as yaml from 'yaml';
import * as fs from 'fs';
import {
  extendZodWithOpenApi,
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';
import path from 'path';
import { z } from 'zod';

import {
  createuserDto,
  createuserResponse,
  validationerrorSchema,
  errorschema,
  signinDto,
  createProductDto,
  productResponse,
  editProductDto,
  productFiltersDto,
  createOrderResponse,
  verifypaymentbody,
  orderresponse,
  pagination,
  userordersresponse,
  createLocationDto,
  editLocation,
  locationDto,
  userlocations,
} from '@ecommerce/types';

extendZodWithOpenApi(z);

const mystoreregistry = new OpenAPIRegistry();

const bearerAuth = mystoreregistry.registerComponent(
  'securitySchemes',
  'bearerAuth',
  {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  }
);
mystoreregistry.registerPath({
  method: 'post',
  path: '/auth/signup',
  description: 'Signup a new user',
  summary: 'Signup route for creating a new user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createuserDto,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'New user created',
      content: {
        'application/json': {
          schema: z.object({
            data: createuserResponse,
            message: z.string(),
          }),
        },
      },
    },
    409: {
      description: 'User with this email already exists',
      content: {
        'application/json': {
          schema: errorschema,
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
mystoreregistry.registerPath({
  method: 'post',
  path: '/auth/signin',
  description: 'Sign in an existing user',
  summary: 'Signin route for authenticating a user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: signinDto,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'User signed in successfully',
      content: {
        'application/json': {
          schema: z.object({
            access_token: z
              .string()
              .openapi({ example: 'your.jwt.token.here' }),
            message: z.string().openapi({ example: 'OK' }),
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

    408: {
      description: 'User does not exist or password is incorrect',
      content: {
        'application/json': {
          schema: z.object({
            schema: errorschema,
          }),
        },
      },
    },
  },
});

mystoreregistry.registerPath({
  method: 'post',
  path: '/product',
  description: 'Create a new product',
  summary: 'Create product route for sellers',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createProductDto,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Product created successfully',
      content: {
        'application/json': {
          schema: productResponse,
        },
      },
    },
    400: {
      description: 'Validation error or bad request',
      content: {
        'application/json': {
          schema: validationerrorSchema,
        },
      },
    },
    500: {
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'Internal server error' }),
          }),
        },
      },
    },
  },
});

mystoreregistry.registerPath({
  method: 'delete',
  path: '/product/{productId}',
  description: 'Delete an existing product',
  summary: 'Delete product route for sellers',

  request: {
    params: z.object({
      procdutId: z.string().uuid().openapi({ example: 'mglb,figji1' }),
    }),
  },

  responses: {
    200: {
      description: 'Product deleted successfully',
      content: {
        'application/json': {
          schema: z.object({
            data: productResponse,
            message: z
              .string()
              .openapi({ example: 'Product deleted successfully' }),
          }),
        },
      },
    },
    404: {
      description: 'Product not found',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'Product not found' }),
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
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'Internal server error' }),
          }),
        },
      },
    },
  },
});

mystoreregistry.registerPath({
  method: 'patch',
  path: '/product/{productId}',
  description: 'Update an existing product',
  summary: 'Update product route for sellers',

  request: {
    params: z.object({
      procdutId: z.string().uuid().openapi({ example: 'mglb,figji1' }),
    }),
    body: {
      content: {
        'application/json': {
          schema: editProductDto,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Product updated successfully',
      content: {
        'application/json': {
          schema: z.object({
            data: productResponse,
            message: z
              .string()
              .openapi({ example: 'Product updated successfully' }),
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
      description: 'Product not found',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'Product not found' }),
          }),
        },
      },
    },
    500: {
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'Internal server error' }),
          }),
        },
      },
    },
  },
});

mystoreregistry.registerPath({
  method: 'get',
  path: '/product',
  description: 'Retrieve all products',
  summary: 'Get products route for buyers and sellers',
  request: {
    query: productFiltersDto,
  },
  responses: {
    200: {
      description: 'Products retrieved successfully',
      content: {
        'application/json': {
          schema: z.object({
            data: productResponse.array(),
            message: z
              .string()
              .openapi({ example: 'Products retrieved successfully' }),
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
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'Internal server error' }),
          }),
        },
      },
    },
  },
});

mystoreregistry.registerPath({
  method: 'post',
  path: '/order/create-order',
  description: 'Retrieve all products',
  summary: 'Get products route  sdxhh for buyers and sellers',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            amount: z.number(),
            products: z.array(
              z.object({
                id: z.string().uuid(),
                quantity: z.number().int().positive(),
              })
            ),
            locationId: z.string().uuid(),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Order successfully',
      content: {
        'application/json': {
          schema: z.object({
            data: createOrderResponse,
            message: z
              .string()
              .openapi({ example: 'Order Created successfully' }),
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
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: errorschema,
        },
      },
    },
    500: {
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({
              example: 'Internal server error or Failed to create order',
            }),
          }),
        },
      },
    },
  },
});

mystoreregistry.registerPath({
  method: 'post',
  path: '/order/update-transaction-status',
  description: 'Update transaction status',
  summary: 'Update transaction status after payment process',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({ verifypaymentbody }),
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Ordered successfully',
      content: {
        'application/json': {
          schema: z.object({
            data: orderresponse,
            message: z
              .string()
              .openapi({ example: 'Order Created successfully' }),
          }),
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: errorschema,
        },
      },
    },
    404: {
      description: 'orderid for updating transaction rong or order not found',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'order not found' }),
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
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({
              example: 'Internal server error or Failed to create order',
            }),
          }),
        },
      },
    },
  },
});
mystoreregistry.registerPath({
  method: 'post',
  path: '/location/create',
  description: 'Create a new location',
  summary: 'Create a new location for the user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createLocationDto,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Location created successfully',
      content: {
        'application/json': {
          schema: z.object({
            data: z.object({
              safelocation: locationDto,
              userlocation: z.boolean(),
            }),
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
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: errorschema,
        },
      },
    },
    500: {
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'Internal server error' }),
          }),
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});

mystoreregistry.registerPath({
  method: 'patch',
  path: '/location/update/:locationId',
  description: 'Update an existing location',
  summary: 'Update an existing location for the user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: editLocation,
        },
      },
    },
    params: z.object({
      locationId: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: 'Location updated successfully',
      content: {
        'application/json': {
          schema: z.object({
            data: locationDto,
            message: z
              .string()
              .openapi({ example: 'Location updated successfully' }),
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
      description: 'Location not found',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'Location not found' }),
          }),
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: errorschema,
        },
      },
    },
    500: {
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'Internal server error' }),
          }),
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});

mystoreregistry.registerPath({
  method: 'delete',
  path: '/location/delete/:locationId',
  description: 'Delete an existing location',
  summary: 'Delete an existing location for the user',
  request: {
    params: z.object({
      locationId: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: 'Location deleted successfully',
      content: {
        'application/json': {
          schema: z.object({
            data: z.boolean(),
            message: z
              .string()
              .openapi({ example: 'Location deleted successfully' }),
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
      description: 'Location not found',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'Location not found' }),
          }),
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: errorschema,
        },
      },
    },
    500: {
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'Internal server error' }),
          }),
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});

mystoreregistry.registerPath({
  method: 'get',
  path: '/location/:locationId',
  description: 'Retrieve a location',
  summary: 'Get a specific location',
  request: {
    params: z.object({
      locationId: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: 'Location retrieved successfully',
      content: {
        'application/json': {
          schema: z.object({
            data: locationDto,
            message: z
              .string()
              .openapi({ example: 'Location retrieved successfully' }),
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
      description: 'Location not found',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'Location not found' }),
          }),
        },
      },
    },
    500: {
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'Internal server error' }),
          }),
        },
      },
    },
  },
});
mystoreregistry.registerPath({
  method: 'get',
  path: '/location/user/locations',
  description: 'Retrieve all user locations',
  summary: 'Get all user locations',
  responses: {
    200: {
      description: 'Locations retrieved successfully',
      content: {
        'application/json': {
          schema: z.object({
            data: userlocations,
            message: z
              .string()
              .openapi({ example: 'Locations retrieved successfully' }),
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
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: errorschema,
        },
      },
    },
    500: {
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'Internal server error' }),
          }),
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
});
mystoreregistry.registerPath({
  method: 'get',
  path: '/order/userorders',
  description: 'Retrieve all user orders',
  summary: 'Get orders of a user',
  request: {
    query: pagination,
  },
  responses: {
    200: {
      description: 'orders retrieved successfully',
      content: {
        'application/json': {
          schema: z.object({
            data: userordersresponse,
            message: z
              .string()
              .openapi({ example: 'orders retrieved successfully' }),
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
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string().openapi({ example: 'Internal server error' }),
          }),
        },
      },
    },
  },
});

function getOpenApiDocumentation() {
  const generator = new OpenApiGeneratorV3(mystoreregistry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Mystore',
      description: 'This is the mystore API',
    },
    servers: [{ url: process.env.BACKEND_URL }],
  });
}

function writeDocumentation() {
  const docs = getOpenApiDocumentation();

  const fileContent = yaml.stringify(docs);

  const outputPath = path.join(__dirname, 'openapi-docs.yaml');

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

writeDocumentation();
export { writeDocumentation };
