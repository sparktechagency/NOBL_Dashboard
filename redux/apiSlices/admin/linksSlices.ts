import { api } from "../../api/baseApi";

const _pathName = "/admin/links";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // --------------------Start----------------------
    getLinks: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `${_pathName}`,
        params: params,
      }),
      providesTags: ["links"],
    }),
    addLinks: builder.mutation<any, any>({
      query: (data) => ({
        url: `${_pathName}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["links"],
    }),
    updateLinks: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `${_pathName}/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["links"],
    }),
    deleteLinks: builder.mutation<any, any>({
      query: (id) => ({
        url: `${_pathName}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["links"],
    }),

    // --------------------End----------------------
  }),
});

export const {
  useAddLinksMutation,
  useDeleteLinksMutation,
  useGetLinksQuery,
  useLazyGetLinksQuery,
  useUpdateLinksMutation,
} = authSlice;
