import { z } from 'zod';

const additionalPropertiesSchema = z
  .record(z.string(), z.union([z.string(), z.number()]))
  .nullable();
const createProductDto = z.object({
  name: z.string(),
  category: z.string(),
  description: z.string(),
  price: z.number(),
  compare_price: z.number(),
  inventory_quantity: z.number(),
  tags: z.array(z.string()),
  additionproperties: additionalPropertiesSchema.optional(),
});
const productResponse = createProductDto.extend({
  id: z.string().uuid(),
});
const productcard = productResponse.omit({
  description: true,
  inventory_quantity: true,
  tags: true,
  additionproperties: true,
});

const cartproduct = productResponse
  .pick({
    id: true,
    name: true,
    price: true,
    inventory_quantity: true,
  })
  .extend({ quantity: z.number() });
const productsResponse = z.object({
  rows: z.array(productResponse),
  count: z.number(),
});
const productcardsresponse = z.object({
  rows: z.array(productcard),
  count: z.number(),
});
const productFiltersDto = z
  .object({
    category: z.string(),
    tags: z.string(),
    minprice: z.string(),
    maxprice: z.string(),
    offset: z.string(),
    limit: z.string(),
  })
  .partial();
const productFiltersServiceDto = productFiltersDto
  .omit({
    tags: true,
  })
  .extend({
    tags: z.array(z.string()),
  })
  .partial();
const editProductDto = createProductDto.partial();

const deleteproductResponse = productResponse.pick({
  id: true,
  name: true,
});

type createProductType = z.infer<typeof createProductDto>;

type editProductType = z.infer<typeof editProductDto>;
type productResponseType = z.infer<typeof productResponse>;
type productsResponseType = z.infer<typeof productsResponse>;
type productsFiltersType = z.infer<typeof productFiltersDto>;
type productFiltersServiceType = z.infer<typeof productFiltersServiceDto>;
type deleteproductResponseType = z.infer<typeof deleteproductResponse>;
type productcardResponseType = z.infer<typeof productcard>;
type productscardsResponseType = z.infer<typeof productcardsresponse>;
type cartProductType = z.infer<typeof cartproduct>;
export {
  createProductDto,
  editProductDto,
  createProductType,
  productcardsresponse,
  cartProductType,
  cartproduct,
  productscardsResponseType,
  editProductType,
  productResponse,
  productcardResponseType,
  productcard,
  productResponseType,
  deleteproductResponseType,
  productFiltersDto,
  productsFiltersType,
  deleteproductResponse,
  productsResponseType,
  productsResponse,
  productFiltersServiceDto,
  productFiltersServiceType,
};
