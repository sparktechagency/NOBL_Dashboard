import { api } from "../../api/baseApi";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // --------------------Start----------------------
    getCategory: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `/admin/categories`,
        params: params,
      }),
      providesTags: ["category"],
    }),
    addCategory: builder.mutation<any, any>({
      query: (data) => ({
        url: `/admin/categories`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/admin/categories/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation<any, any>({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),

    // --------------------End----------------------
  }),
});

export const {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useLazyGetCategoryQuery,
} = authSlice;
