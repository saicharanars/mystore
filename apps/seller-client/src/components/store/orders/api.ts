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
  isErrorSchemaType,
  isValidationSchemaType,
} from '@ecommerce/types';
import { SerializedError } from '@reduxjs/toolkit';
import { transformErrorResponse } from '../shipments/api';

const url = 'http://localhost:3001';

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
      transformErrorResponse,
    }),
    getOrderById: build.query<
  }),
});

export const { useGetOrdersQuery } = orderApi;
