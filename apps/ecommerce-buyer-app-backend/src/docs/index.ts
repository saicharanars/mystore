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
} from '@ecommerce/types';

extendZodWithOpenApi(z);

const authregistry = new OpenAPIRegistry();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const bearerAuth = authregistry.registerComponent(
  'securitySchemes',
  'bearerAuth',
  {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  }
);
// Register paths with security
authregistry.registerPath({
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
authregistry.registerPath({
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

function getOpenApiDocumentation() {
  const generator = new OpenApiGeneratorV3(authregistry.definitions);

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
