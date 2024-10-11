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
} from '@ecommerce/types';
import { SerializedError } from '@reduxjs/toolkit';

const url = 'http://localhost:3003';

export const shipmentApi = createApi({
  reducerPath: 'shipmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}/shipment/`,
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
      transformErrorResponse(
        baseQueryReturnValue: FetchBaseQueryError,
        meta,
        arg
      ) {
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
            message:
              baseQueryReturnValue.error || 'An unexpected error occurred',
          };
        }
      },
    }),
  }),
});

export const {
  useAddshipmentMutation,
  useGetshipmentbyOrderidQuery,

  useUpdateshipmentMutation,
} = shipmentApi;
