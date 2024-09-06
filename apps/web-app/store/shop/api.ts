import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
  errorschemaType,
  productscardsResponseType,
  productsFiltersType,
  productsResponseType,
  validationerrorSchemaType,
} from '@ecommerce/types';
import { SerializedError } from '@reduxjs/toolkit';

const url = 'http://localhost:3001';

function isErrorSchemaType(data: unknown): data is errorschemaType {
  return (data as errorschemaType).error !== undefined;
}
function isValidationSchemaType(
  data: unknown
): data is validationerrorSchemaType {
  return (data as validationerrorSchemaType).error !== undefined;
}

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}`,
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    getProducts: build.query<productscardsResponseType, productsFiltersType>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        queryParams.append('_t', Date.now().toString());
        if (params.category) queryParams.append('category', params.category);
        if (params.tags) queryParams.append('tags', params.tags);
        if (params.maxprice)
          queryParams.append('maxprice', params.maxprice.toString());
        if (params.minprice)
          queryParams.append('minprice', params.minprice.toString());
        if (params.offset)
          queryParams.append('offset', params.offset.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        return {
          url: `/product?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      keepUnusedDataFor: 0,
      transformResponse: (response: { data: productscardsResponseType }) =>
        response.data,
      transformErrorResponse(
        baseQueryReturnValue: FetchBaseQueryError | SerializedError,
        meta,
        arg
      ) {
        if (
          baseQueryReturnValue &&
          typeof baseQueryReturnValue === 'object' &&
          'data' in baseQueryReturnValue
        ) {
          const errorData = baseQueryReturnValue.data as
            | errorschemaType
            | validationerrorSchemaType;

          if (isErrorSchemaType(errorData)) {
            return errorData.error.message;
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

export const { useGetProductsQuery } = shopApi;
