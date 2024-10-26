import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  productscardsResponseType,
  productsFiltersType,
} from '@ecommerce/types';
import { transformErrorResponse } from '../orders/api';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}`,
    prepareHeaders: (headers) => {
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
      transformErrorResponse,
    }),
  }),
});

export const { useGetProductsQuery } = shopApi;
