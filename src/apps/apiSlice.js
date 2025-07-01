import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jwtDecode } from "jwt-decode";
import { userLoggedIn, userLoggedOut } from "../redux/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API_URI,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.userInfo?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    const selectShop = localStorage.getItem("ownerShop");
    if (selectShop) {
      headers.set("selectShop", selectShop);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      { url: "/auth/refresh-token", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult?.data?.accessToken) {
      const newAccessToken = refreshResult.data.accessToken;
      const decoded = jwtDecode(newAccessToken);

      api.dispatch(userLoggedIn({ ...decoded, token: newAccessToken }));
      localStorage.setItem("accessToken", newAccessToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(userLoggedOut());
      localStorage.removeItem("accessToken");
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "poshApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Event'],
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (eventData) => ({
        url: '/events',
        method: 'POST',
        body: eventData,
      }),
      invalidatesTags: ['Event'],
    }),
  }),
});

export const { useCreateEventMutation } = apiSlice;
