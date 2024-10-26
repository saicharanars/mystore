import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  createLocationType,
  createuser,
  createuserResponseType,
  locationType,
  signinresponseschemaType,
  signinuser,
  userlocationsType,
} from '@ecommerce/types';
import { transformErrorResponse } from '../orders/api';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
interface ApiResponse {
  addlocation: {
    data: locationType;
    userlocation: boolean;
  };
  message: string;
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
      transformErrorResponse,
    }),
    signIn: build.mutation<signinresponseschemaType, { user: signinuser }>({
      query: ({ user }) => ({
        url: `/auth/signin`,
        method: 'POST',
        body: user,
      }),

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
      transformResponse: (response: ApiResponse) => {
        return response.addlocation.data;
      },
      transformErrorResponse,
    }),
  }),
});

export const {
  useSignUpMutation,
  useAddLocationMutation,
  useGetLocationsQuery,
  useSignInMutation,
} = userApi;
