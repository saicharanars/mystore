import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
  errorschemaType,
  paginationType,
  sellerorderresponseType,
  validationerrorSchemaType,
} from '@ecommerce/types';
import { SerializedError } from '@reduxjs/toolkit';

const url = 'http://localhost:3001';

function isErrorSchemaType(data: unknown): data is errorschemaType {
  return (data as errorschemaType).message !== undefined;
}
function isValidationSchemaType(
  data: unknown
): data is validationerrorSchemaType {
  return (data as validationerrorSchemaType).error !== undefined;
}

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}/order/`,
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  tagTypes: ['product'],
  endpoints: (build) => ({
    getOrders: build.query<
      sellerorderresponseType,
      { token: string; pagination?: paginationType }
    >({
      query: ({ token, pagination }) => {
        const queryParams = new URLSearchParams();
        if (pagination?.limit) queryParams.append('limit', pagination.limit);
        if (pagination?.offset) queryParams.append('offset', pagination.offset);

        return {
          url: `seller-orders?${queryParams.toString()}`,
          method: 'GET',
          headers: {
            Authorization: token,
          },
        };
      },
      transformResponse: (response: { data: sellerorderresponseType }) =>
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
  }),
});

export const { useGetOrdersQuery } = orderApi;
