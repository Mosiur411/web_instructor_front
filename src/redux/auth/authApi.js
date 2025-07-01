import { apiSlice } from "../../apps/apiSlice";

export const authApi = apiSlice.enhanceEndpoints({ addTagTypes: ['profile auth'] }).injectEndpoints({
    endpoints: (builder) => ({

        loginauthApi: builder.mutation({
            query: (data) => ({
                url: "auth/login",
                method: "POST",
                body: data,
            }),
            providesTags:["profile auth"]
        }),
        logoutauthApi: builder.mutation({
            query: (data) => ({
                url: "auth/logout",
                method: "POST",
                body: data,
            }),
        }),
        registerauthApi: builder.mutation({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["atuh"],
        }),


    }),
});

export const {
    useLoginauthApiMutation,
    useLogoutauthApiMutation,
    useRegisterauthApiMutation,

} = authApi;
