import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
  errorschemaType,
  locationType,
  userlocationsType,
  userordersinputtype,
  userordersresponseType,
  createLocationType,
  validationerrorSchemaType,
} from '@ecommerce/types';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

function isErrorSchemaType(data: unknown): data is errorschemaType {
  return (data as errorschemaType).message !== undefined;
}
function isValidationSchemaType(
  data: unknown
): data is validationerrorSchemaType {
  return (data as validationerrorSchemaType).message !== undefined;
}

export const transformErrorResponse = (
  baseQueryReturnValue: FetchBaseQueryError
): { status: number; message: string } => {
  if (
    'status' in baseQueryReturnValue &&
    baseQueryReturnValue.status !== 'FETCH_ERROR'
  ) {
    const errorData = baseQueryReturnValue.data as
      | errorschemaType
      | validationerrorSchemaType
      | undefined;

    if (errorData) {
      if (isErrorSchemaType(errorData) || isValidationSchemaType(errorData)) {
        return {
          status:
            typeof baseQueryReturnValue.status === 'number'
              ? baseQueryReturnValue.status
              : 500,
          message: errorData.message,
        };
      }
    }

    return {
      status:
        typeof baseQueryReturnValue.status === 'number'
          ? baseQueryReturnValue.status
          : 500,
      message: 'An unknown error occurred',
    };
  } else {
    return {
      status: 500,
      message:
        typeof baseQueryReturnValue.error === 'string'
          ? baseQueryReturnValue.error
          : 'An unexpected error occurred',
    };
  }
};

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
      transformErrorResponse,
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
      transformErrorResponse,
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
      transformErrorResponse,
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetLocationsQuery,
  useAddLocationMutation,
} = orderApi;
