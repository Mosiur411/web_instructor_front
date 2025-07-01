import { apiSlice } from "../../apps/apiSlice";

export const userApi = apiSlice.enhanceEndpoints({ addTagTypes: ['profile auth'] }).injectEndpoints({
    endpoints: (builder) => ({
        profileuserApi: builder.query({
            query: () => ({
                url: "user/profile",
            }),
            providesTags:["profile auth"]
            
        }),
        updateuserApi: builder.mutation({
            query: (data) => ({
                url: "user/updateProfile",
                method: "PUT",
                body: data,
            }),
             invalidatesTags: ['profile auth'],
        }),


    }),
});

export const {
    useProfileuserApiQuery,
    useUpdateuserApiMutation

} = userApi;
