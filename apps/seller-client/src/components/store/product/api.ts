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
  ProductType,
  validationerrorSchemaType,
} from '@ecommerce/types';
import { SerializedError } from '@reduxjs/toolkit';

const url = 'http://localhost:3003';

function isErrorSchemaType(data: unknown): data is errorschemaType {
  return (data as errorschemaType).message !== undefined;
}
function isValidationSchemaType(
  data: unknown
): data is validationerrorSchemaType {
  return (data as validationerrorSchemaType).error !== undefined;
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}`,
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
          url: '/product/images',
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
          url: '/product/',
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
  }),
});

export const { useAddimageMutation, useAddProductMutation } = productApi;
