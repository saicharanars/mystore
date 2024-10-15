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

const url = import.meta.env.VITE_SELLER_URL;
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

      transformErrorResponse,
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

      transformErrorResponse,
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
