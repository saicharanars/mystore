import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
  createshipmentType,
  editshipmentType,
  errorschemaType,
  shipmentType,
  validationerrorSchemaType,
  isErrorSchemaType,
  isValidationSchemaType,
  paginationType,
  shipmentsResponseType,
} from '@ecommerce/types';
import { SerializedError } from '@reduxjs/toolkit';

const url = 'http://localhost:3003';

export const transformErrorResponse = (
  baseQueryReturnValue: FetchBaseQueryError,
  meta,
  arg
) => {
  console.log(baseQueryReturnValue);
  if (
    'status' in baseQueryReturnValue &&
    baseQueryReturnValue.status !== 'FETCH_ERROR'
  ) {
    const errorData = baseQueryReturnValue.data as
      | errorschemaType
      | validationerrorSchemaType;
    console.log(errorData);
    if (isErrorSchemaType(errorData)) {
      console.log(errorData.message, '>>>>>>');
      return {
        status: baseQueryReturnValue.status,
        message: errorData.message,
      };
    } else if (isValidationSchemaType(errorData)) {
      return {
        status: baseQueryReturnValue.status,
        message: errorData.error
          .map((e) => `${e.path}: ${e.message}`)
          .join(', '),
      };
    }
  } else {
    return {
      status: baseQueryReturnValue.status || 500,
      message: baseQueryReturnValue.error || 'An unexpected error occurred',
    };
  }
};

export const shipmentApi = createApi({
  reducerPath: 'shipmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}/shipment`,
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),

  tagTypes: ['shipment'],
  endpoints: (build) => ({
    addshipment: build.mutation<
      shipmentType,
      { body: createshipmentType; token: string }
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
      transformResponse: (response: { data: shipmentType }) => response.data,

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
    updateshipment: build.mutation<
      shipmentType,
      { body: editshipmentType; token: string; shipmentid: string }
    >({
      query: ({ body, token, shipmentid }) => {
        return {
          url: `/${shipmentid}`,
          method: 'PATCH',
          body: body,
          headers: {
            Authorization: token,
          },
        };
      },
      transformResponse: (response: { data: shipmentType }) => response.data,

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
    getshipmentbyOrderid: build.query<shipmentType, { orderId: string }>({
      query: ({ orderId }) => {
        return {
          url: `/order/${orderId}`,
          method: 'GET',
        };
      },
      transformResponse: (response: { data: shipmentType }) => response.data,
      transformErrorResponse,
    }),
    getShipments: build.query<
      shipmentsResponseType,
      { token: string; pagination: paginationType }
    >({
      query: ({ token, pagination }) => {
        const queryParams = new URLSearchParams();
        if (pagination?.limit) queryParams.append('limit', pagination.limit);

        if (pagination?.offset) queryParams.append('offset', pagination.offset);

        return {
          url: `?${queryParams.toString()}`,
          method: 'GET',
          headers: {
            Authorization: token,
          },
        };
      },
      transformResponse: (response: { data: shipmentsResponseType }) =>
        response.data,
      transformErrorResponse,
    }),
    deleteShipment: build.mutation<
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
      transformErrorResponse,
    }),
  }),
});

export const {
  useAddshipmentMutation,
  useGetshipmentbyOrderidQuery,
  useGetShipmentsQuery,
  useDeleteShipmentMutation,
  useUpdateshipmentMutation,
} = shipmentApi;
