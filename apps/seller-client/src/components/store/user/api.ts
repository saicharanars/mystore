import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
  createLocationType,
  createuser,
  createuserResponseType,
  errorschemaType,
  locationType,
  signinresponseschemaType,
  signinuser,
  userlocationsType,
  validationerrorSchemaType,
} from '@ecommerce/types';
import { SerializedError } from '@reduxjs/toolkit';

const url = 'http://localhost:3001';
interface ApiResponse {
  addlocation: {
    data: locationType;
    userlocation: boolean;
  };
  message: string;
}

function isErrorSchemaType(data: unknown): data is errorschemaType {
  return (data as errorschemaType).message !== undefined;
}
function isValidationSchemaType(
  data: unknown
): data is validationerrorSchemaType {
  return (data as validationerrorSchemaType).error !== undefined;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}`,
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    signUp: build.mutation<createuserResponseType, { user: createuser }>({
      query: ({ user }) => ({
        url: `/auth/signup`,
        method: 'POST',
        body: user,
      }),
      transformResponse: (response: { data: createuserResponseType }) =>
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
    signIn: build.mutation<signinresponseschemaType, { user: signinuser }>({
      query: ({ user }) => ({
        url: `/auth/signin`,
        method: 'POST',
        body: user,
      }),

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
      transformResponse: (response: ApiResponse) => {
        return response.addlocation.data;
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useAddLocationMutation,
  useGetLocationsQuery,
  useSignInMutation,
} = userApi;
