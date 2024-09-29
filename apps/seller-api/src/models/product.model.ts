import { ProductType } from '@ecommerce/types';
import mongoose, { Schema } from 'mongoose';
import { randomUUID } from 'node:crypto';

const ProductSchema = new Schema<ProductType>(
  {
    _id: {
      type: Schema.Types.String,
      required: true,
      default: () => randomUUID(),
    },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ['draft', 'publish'],
    },
    visibility: { type: Boolean, required: true },
    description: { type: String, required: true },
    short_description: { type: String, required: true },
    price: { type: Number, required: true },
    compare_price: { type: Number, required: true },
    sale_price: { type: Number },
    on_sale: { type: Boolean, required: true },
    stock_quantity: { type: Number, required: true },
    stock_status: {
      type: String,
      required: true,
      enum: ['in_stock', 'out_of_stock'],
    },
    categories: { type: [String], required: true },
    tags: { type: [String], required: true },
    images: { type: [String], required: true },
    attributes: {
      type: Object,
      required: true,
    },
    userId: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;
