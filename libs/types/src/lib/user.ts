import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { locationsarray } from './location';
extendZodWithOpenApi(z);
const userRole = z.enum(['customer', 'seller']);
const createuserDto = z.object({
  name: z.string().openapi({ example: 'myusername' }),
  email: z.string().email().openapi({ example: 'myuser@example.com' }),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password must be no more than 20 characters long')
    .regex(/[a-z]/, 'Password must include at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
    .regex(/\d/, 'Password must include at least one number')
    .openapi({ example: 'Ghajvh12563' }),
  role: userRole,
});
const signinDto = createuserDto.omit({ name: true, role: true });
const signinresponseschema = z.object({
  data: z.object({
    access_token: z.string(),
  }),
  message: z.string(),
});
const removepassword = createuserDto.omit({ password: true });
const createuserResponse = removepassword.extend({
  id: z.string().openapi({ example: 'randomuuid' }),
});

const errorschema = z.object({
  message: z.string(),
});
const validationerrorSchema = z
  .object({
    message: z.string(),
  })
  .openapi({ description: 'Validation error response' });

function isErrorSchemaType(data: unknown): data is errorschemaType {
  return (data as errorschemaType).message !== undefined;
}
function isValidationSchemaType(
  data: unknown
): data is validationerrorSchemaType {
  return (data as validationerrorSchemaType).message !== undefined;
}

const usertokendto = createuserResponse
  .omit({ name: true })
  .extend({ iat: z.number(), exp: z.number() });
type usertokentype = z.infer<typeof usertokendto>;
type userRoletype = z.infer<typeof userRole>;
type errorschemaType = z.infer<typeof errorschema>;
type signinresponseschemaType = z.infer<typeof signinresponseschema>;
type validationerrorSchemaType = z.infer<typeof validationerrorSchema>;
type createuserResponseType = z.infer<typeof createuserResponse>;
type createuser = z.infer<typeof createuserDto>;
type signinuser = z.infer<typeof signinDto>;
export {
  createuserResponse,
  signinresponseschema,
  validationerrorSchema,
  createuserDto,
  errorschema,
  removepassword,
  signinDto,
  userRole,
  isErrorSchemaType,
  isValidationSchemaType,
};
export type {
  createuser,
  userRoletype,
  errorschemaType,
  signinresponseschemaType,
  createuserResponseType,
  validationerrorSchemaType,
  signinuser,
  usertokentype,
};
