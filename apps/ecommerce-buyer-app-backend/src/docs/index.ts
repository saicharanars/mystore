import { z } from 'zod';
import * as yaml from 'yaml';
import * as fs from 'fs';
import {
  extendZodWithOpenApi,
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';
import path from 'path';

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

// Create a new OpenAPI registry for product-related routes

mystoreregistry.registerPath({
  method: 'post',
  path: '/products',
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
  path: '/products/{productId}',
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
  path: '/products/{productId}',
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
  path: '/products',
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

function getOpenApiDocumentation() {
  const generator = new OpenApiGeneratorV3(mystoreregistry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Mystore',
      description: 'This is the mystore API',
    },
    servers: [{ url: 'http://localhost:3001' }],
  });
}

function writeDocumentation() {
  // Generate OpenAPI documentation
  const docs = getOpenApiDocumentation();

  // Convert to YAML
  const fileContent = yaml.stringify(docs);

  // Define the output file path
  const outputPath = path.join(__dirname, 'openapi-docs.yaml');

  // Try writing the file
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
