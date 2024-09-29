import { z } from 'zod';

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
  price: z.number().min(0, 'Price must be a positive number'),
  compare_price: z.number().min(0, 'Regular price must be a positive number'),
  sale_price: z
    .number()
    .min(0, 'Sale price must be a positive number')
    .optional(),
  on_sale: z.boolean(),
  stock_quantity: z.number().min(0, 'Stock quantity must be a positive number'),
  stock_status: z.enum(['in_stock', 'out_of_stock']),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
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
const productFilters = z.object({
  category: z.string(),
  tags: z.string(),
  minprice: z.string(),
  maxprice: z.string(),
  skip: z.string(),
  limit: z.string(),
});
const editProduct = createProductSchema.partial();
type ProductType = z.infer<typeof ProductSchemaZod>;
type CreateProductType = z.infer<typeof createProductSchema>;
type UpdateProductType = z.infer<typeof editProduct>;
type productFilterType = z.infer<typeof productFilters>;

export { ProductSchemaZod, createProductSchema, editProduct, productFilters };
export type {
  ProductType,
  CreateProductType,
  UpdateProductType,
  productFilterType,
};
