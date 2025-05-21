import { api } from "../../api/baseApi";

const _pathName = "/admin/documents";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // --------------------Start----------------------
    getDocuments: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `${_pathName}`,
        params: params,
      }),
      providesTags: ["photo"],
    }),
    addDocuments: builder.mutation<any, any>({
      query: (data) => ({
        url: `${_pathName}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["photo"],
    }),
    updateDocuments: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `${_pathName}/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["photo"],
    }),
    deleteDocuments: builder.mutation<any, any>({
      query: (id) => ({
        url: `${_pathName}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["photo"],
    }),

    // --------------------End----------------------
  }),
});

export const {
  useAddDocumentsMutation,
  useDeleteDocumentsMutation,
  useGetDocumentsQuery,
  useLazyGetDocumentsQuery,
  useUpdateDocumentsMutation,
} = authSlice;
