import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
  addImageResponseType,
  addProductResponseType,
  CreateProductType,
  errorschemaType,
  productFilterType,
  ProductsResponseType,
  ProductType,
  UpdateProductType,
  validationerrorSchemaType,
  isErrorSchemaType,
  isValidationSchemaType,
} from '@ecommerce/types';
import { SerializedError } from '@reduxjs/toolkit';
import { boolean, string } from 'zod';

const url = 'http://localhost:3003';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}/product/`,
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  tagTypes: ['product'],
  endpoints: (build) => ({
    addimage: build.mutation<string[], { images: File[]; token: string }>({
      query: ({ images, token }) => {
        const formData = new FormData();
        images.forEach((file) => formData.append('images', file));
        return {
          url: 'images',
          method: 'POST',
          body: formData,
          headers: {
            Authorization: token,
          },
        };
      },
      transformResponse: (response: addImageResponseType) => response.data,

      transformErrorResponse(
        baseQueryReturnValue: FetchBaseQueryError | SerializedError,
        meta,
        arg
      ) {
        console.log(baseQueryReturnValue);
        if (
          baseQueryReturnValue &&
          typeof baseQueryReturnValue === 'object' &&
          'data' in baseQueryReturnValue
        ) {
          const errorData = baseQueryReturnValue.data as
            | errorschemaType
            | validationerrorSchemaType;
          console.log(errorData);
          if (isErrorSchemaType(errorData)) {
            console.log(errorData.message, '>>>>>>');
            return { message: errorData.message };
          } else if (isValidationSchemaType(errorData)) {
            return errorData.error;
          }
        } else {
          return { message: 'An unexpected error occurred' };
        }
      },
    }),
    addProduct: build.mutation<
      ProductType,
      { body: CreateProductType; token: string }
    >({
      query: ({ body, token }) => {
        return {
          url: '/',
          method: 'POST',
          body: body,
          headers: {
            Authorization: token,
          },
        };
      },
      transformResponse: (response: addProductResponseType) => response.data,

      transformErrorResponse(
        baseQueryReturnValue: FetchBaseQueryError | SerializedError,
        meta,
        arg
      ) {
        console.log(baseQueryReturnValue);
        if (
          baseQueryReturnValue &&
          typeof baseQueryReturnValue === 'object' &&
          'data' in baseQueryReturnValue
        ) {
          const errorData = baseQueryReturnValue.data as
            | errorschemaType
            | validationerrorSchemaType;
          console.log(errorData);
          if (isErrorSchemaType(errorData)) {
            console.log(errorData.message, '>>>>>>');
            return { message: errorData.message };
          } else if (isValidationSchemaType(errorData)) {
            return errorData.error;
          }
        } else {
          return { message: 'An unexpected error occurred' };
        }
      },
    }),
    updateProduct: build.mutation<
      ProductType,
      { body: UpdateProductType; token: string; productid: string }
    >({
      query: ({ body, token, productid }) => {
        return {
          url: `/${productid}`,
          method: 'PATCH',
          body: body,
          headers: {
            Authorization: token,
          },
        };
      },
      transformResponse: (response: addProductResponseType) => response.data,

      transformErrorResponse(
        baseQueryReturnValue: FetchBaseQueryError | SerializedError,
        meta,
        arg
      ) {
        console.log(baseQueryReturnValue);
        if (
          baseQueryReturnValue &&
          typeof baseQueryReturnValue === 'object' &&
          'data' in baseQueryReturnValue
        ) {
          const errorData = baseQueryReturnValue.data as
            | errorschemaType
            | validationerrorSchemaType;
          console.log(errorData);
          if (isErrorSchemaType(errorData)) {
            console.log(errorData.message, '>>>>>>');
            return { message: errorData.message };
          } else if (isValidationSchemaType(errorData)) {
            return errorData.error;
          }
        } else {
          return { message: 'An unexpected error occurred' };
        }
      },
    }),
    getProducts: build.query<
      ProductsResponseType,
      { token: string; filters?: productFilterType }
    >({
      query: ({ token, filters }) => {
        const queryParams = new URLSearchParams();
        if (filters?.category) queryParams.append('category', filters.category);
        if (filters?.limit) queryParams.append('limit', filters.limit);
        if (filters?.maxprice) queryParams.append('maxprice', filters.maxprice);
        if (filters?.minprice) queryParams.append('minprice', filters.minprice);
        if (filters?.skip) queryParams.append('skip', filters.skip);
        if (filters?.tags) queryParams.append('tags', filters.tags);

        return {
          url: `findproducts?${queryParams.toString()}`,
          method: 'GET',
          headers: {
            Authorization: token,
          },
        };
      },
      transformResponse: (response: { data: ProductsResponseType }) =>
        response.data,
      transformErrorResponse(
        baseQueryReturnValue: FetchBaseQueryError | SerializedError,
        meta,
        arg
      ) {
        console.log(baseQueryReturnValue);
        if (
          baseQueryReturnValue &&
          typeof baseQueryReturnValue === 'object' &&
          'data' in baseQueryReturnValue
        ) {
          const errorData = baseQueryReturnValue.data as
            | errorschemaType
            | validationerrorSchemaType;
          console.log(errorData);
          if (isErrorSchemaType(errorData)) {
            console.log(errorData.message, '>>>>>>');
            return { message: errorData.message };
          } else if (isValidationSchemaType(errorData)) {
            return errorData.error;
          }
        } else {
          return { message: 'An unexpected error occurred' };
        }
      },
    }),
    deleteProduct: build.mutation<
      { success: boolean },
      { id: string; token: string }
    >({
      query: ({ id, token }) => {
        return {
          url: `/${id}`,
          method: 'DELETE',
          headers: {
            Authorization: token,
          },
        };
      },
      transformResponse: (response: { success: boolean; message: string }) => ({
        success: response.success,
      }),
      transformErrorResponse(
        baseQueryReturnValue: FetchBaseQueryError | SerializedError,
        meta,
        arg
      ) {
        console.log(baseQueryReturnValue);
        if (
          baseQueryReturnValue &&
          typeof baseQueryReturnValue === 'object' &&
          'data' in baseQueryReturnValue
        ) {
          const errorData = baseQueryReturnValue.data as
            | errorschemaType
            | validationerrorSchemaType;
          console.log(errorData);
          if (isErrorSchemaType(errorData)) {
            console.log(errorData.message, '>>>>>>');
            return { message: errorData.message };
          } else if (isValidationSchemaType(errorData)) {
            return errorData.error;
          }
        } else {
          return { message: 'An unexpected error occurred' };
        }
      },
    }),
  }),
});

export const {
  useAddimageMutation,
  useAddProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
