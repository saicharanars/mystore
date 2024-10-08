import { z } from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const ProductSchemaZod = z.object({
  _id: z.string().uuid(),
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'maximum characters 100'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(150, 'maximum characters 150'),
  status: z.enum(['draft', 'publish']),
  visibility: z.boolean(),
  description: z
    .string()
    .min(10, 'Must be 10 or more characters long')
    .max(2000, 'Must be 2000 or fewer characters long'),
  short_description: z
    .string()
    .min(10, 'Must be 10 or more characters long')
    .max(500, 'Must be 500 or fewer characters long'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  compare_price: z.coerce
    .number()
    .min(0, 'Regular price must be a positive number'),
  sale_price: z.coerce
    .number()
    .min(0, 'Sale price must be a positive number')
    .optional(),
  on_sale: z.boolean(),
  stock_quantity: z.coerce
    .number()
    .min(0, 'Stock quantity must be a positive number'),
  stock_status: z.enum(['in_stock', 'out_of_stock']),
  categories: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()),
  attributes: z
    .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
    .optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  userId: z.string().uuid(),
});

const createProductSchema = ProductSchemaZod.omit({
  _id: true,
  created_at: true,
  updated_at: true,
  userId: true,
});
const createProductFormSchema = createProductSchema.omit({
  images: true,
});
const productFilters = z
  .object({
    category: z.string(),
    tags: z.string(),
    minprice: z.string(),
    maxprice: z.string(),
    skip: z.string(),
    limit: z.string(),
  })
  .partial();
const addproductresponseschema = z.object({
  data: ProductSchemaZod,
  message: z.string(),
});
const addimagesresponseschema = z.object({
  data: z.array(z.string()),
  message: z.string(),
});
const images = z.object({
  images: z.array(
    z
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      )
  ),
});
const ProductsResponse = z.object({
  rows: z.array(ProductSchemaZod),
  count: z.number(),
});
type imagestype = z.infer<typeof images>;

const editProduct = createProductSchema.partial();
type ProductType = z.infer<typeof ProductSchemaZod>;
type CreateProductType = z.infer<typeof createProductSchema>;
type UpdateProductType = z.infer<typeof editProduct>;
type productFilterType = z.infer<typeof productFilters>;
type addProductResponseType = z.infer<typeof addproductresponseschema>;
type addImageResponseType = z.infer<typeof addimagesresponseschema>;
type ProductsResponseType = z.infer<typeof ProductsResponse>;

export {
  ProductSchemaZod,
  createProductSchema,
  createProductFormSchema,
  addimagesresponseschema,
  editProduct,
  addproductresponseschema,
  productFilters,
  ProductsResponse,
  images,
};
export type {
  ProductType,
  CreateProductType,
  UpdateProductType,
  addImageResponseType,
  addProductResponseType,
  ProductsResponseType,
  productFilterType,
  imagestype,
};
