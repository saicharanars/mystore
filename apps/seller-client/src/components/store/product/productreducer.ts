import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  locationType,
  ProductsResponseType,
  ProductType,
} from '@ecommerce/types';

interface Product {
  locations: locationType[];
  products: ProductsResponseType['rows'];
  count: ProductsResponseType['count'];
}

const initialState: Product = {
  locations: [],
  products: [],
  count: 0,
};

const ProductSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductsResponseType>) => {
      if (action.payload) {
        state.products = action.payload.rows;
        state.count = action.payload.count;
      } else {
        console.error('No products found', action.payload);
      }
    },
    removeProduct: (state, action: PayloadAction<{ id: string }>) => {
      if (action.payload) {
        state.products = state.products.filter(
          (product) => product._id !== action.payload.id
        );
        state.count = state.products.length;
      } else {
        console.error('No product ID provided', action.payload);
      }
    },
    editproduct: (state, action: PayloadAction<ProductType>) => {
      if (action.payload) {
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      } else {
        console.error('No product data provided', action.payload);
      }
    },
  },
});

export const { setProducts, removeProduct, editproduct } = ProductSlice.actions;
export const selectProduct = (state: RootState) => state.product;
export default ProductSlice.reducer;
