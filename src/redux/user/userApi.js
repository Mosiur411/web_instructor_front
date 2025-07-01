import { apiSlice } from "../../apps/apiSlice";

export const authApi = apiSlice.enhanceEndpoints({ addTagTypes: ['auth'] }).injectEndpoints({
    endpoints: (builder) => ({

        profileuserApi: builder.query({
            query: () => ({
                url: "user/profile",
            }),
        }),
        


    }),
});

export const {
    useProfileuserApiQuery,

} = authApi;
