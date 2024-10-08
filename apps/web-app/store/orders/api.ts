import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
  createLocationDto,
  errorschemaType,
  locationType,
  userlocationsType,
  userordersinputtype,
  userordersresponseType,
  createLocationType,
  validationerrorSchemaType,
} from '@ecommerce/types';
import { SerializedError } from '@reduxjs/toolkit';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

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
    baseUrl: `${url}`,
  }),
  tagTypes: ['Order'],
  endpoints: (build) => ({
    getOrders: build.query<userordersresponseType, userordersinputtype>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.offset)
          queryParams.append('offset', params.offset.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        return {
          url: `/order/user-orders?${queryParams.toString()}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        };
      },
      keepUnusedDataFor: 0,
      transformResponse: (response: { data: userordersresponseType }) =>
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
            return { message: errorData.message };
          } else if (isValidationSchemaType(errorData)) {
            return errorData.error;
          }
        } else {
          return { message: 'An unexpected error occurred' };
        }
      },
    }),
    getLocations: build.query<userlocationsType, string>({
      query: (token) => ({
        url: '/location/user/locations',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response: { data: userlocationsType }) =>
        response.data,
    }),
    addLocation: build.mutation<
      locationType,
      { token: string; location: createLocationType }
    >({
      query: ({ token, location }) => ({
        url: '/location/create',
        method: 'POST',
        body: location,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response: { data: locationType }) => response.data,
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetLocationsQuery,
  useAddLocationMutation,
} = orderApi;
