import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/api/v1/schools/login",
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: "/api/v1/schools/logout",
                method: "POST",
                credentials: "include",
            }),
        }),

        // ***admin section
        register: builder.mutation({
            query: (data) => ({
                url: "/api/v1/schools",
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
        
        getAllSchools: builder.query({
            query: () => ({
                url: "/api/v1/schools",

                credentials: "include",
            }),
            providesTags: ["School"],
            keepUnusedDataFor: 7,
        }),

        getOneSchool: builder.query({
            query: (id) => ({
                url: `/api/v1/schools/${id}`,

                credentials: "include",
            }),
            keepUnusedDataFor: 7,
        }),
        deleteOneSchool: builder.mutation({
            query: (id) => ({
                url: `/api/v1/schools/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
        }),
        updateOneSchool: builder.mutation({
            query: ({ id, data }) => ({
                url: `/api/v1/schools/${id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["School"],
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    
    useGetAllSchoolsQuery,
    useGetOneSchoolQuery,
    useDeleteOneSchoolMutation,
    useUpdateOneSchoolMutation,
} = authApiSlice;
