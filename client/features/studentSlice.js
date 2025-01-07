import { apiSlice } from "./apiSlice";

export const studentSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllStudents: builder.query({
            query: ({ keyword, pageNumber }) => ({
                url: "/api/v1/students",
                params: { keyword, pageNumber },
            }),
            providesTags: ["Student"],
            keepUnusedDataFor: 5,
        }),

        getOneStudent: builder.query({
            query: (id) => ({
                url: `/api/v1/students/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),

        addNewStudent: builder.mutation({
            query: () => ({
                url: "/api/v1/students/",
                method: "POST",
                credentials: "include",
            }),
            invalidatesTags: ["Student"],
        }),

        updateStudent: builder.mutation({
            query: (data) => ({
                url: `/api/v1/students/${data._id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["Student"],
        }),

        addAComment: builder.mutation({
            query: ({ id, data }) => ({
                url: `/api/v1/students/${id}/comments`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["Student"],
        }),
    }),
});

export const {
    useGetAllStudentsQuery,
    useGetOneStudentQuery,
    useAddNewStudentMutation,
    useUpdateStudentMutation,
    useAddACommentMutation,
} = studentSlice;
