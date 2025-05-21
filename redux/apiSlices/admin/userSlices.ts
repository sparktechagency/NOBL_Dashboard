import { api } from "../../api/baseApi";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // --------------------Start----------------------

    getUsers: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `/admin/users`,
        params: params,
      }),
      providesTags: ["user"],
    }),
    addUser: builder.mutation<any, any>({
      query: (data) => ({
        url: `/admin/users`,
        method: "POST",

        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation<any, any>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    // --------------------End----------------------
  }),
});

export const {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useLazyGetUsersQuery,
} = authSlice;
