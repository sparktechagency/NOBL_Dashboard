import { api } from "../../api/baseApi";

const _pathName = "/admin/videos";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // --------------------Start----------------------
    getVideo: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `${_pathName}`,
        params: params,
      }),
      providesTags: ["video"],
    }),
    addVideo: builder.mutation<any, any>({
      query: (data) => ({
        url: `${_pathName}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["video"],
    }),
    updateVideo: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `${_pathName}/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["video"],
    }),
    deleteVideo: builder.mutation<any, any>({
      query: (id) => ({
        url: `${_pathName}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["video"],
    }),

    // --------------------End----------------------
  }),
});

export const {
  useAddVideoMutation,
  useDeleteVideoMutation,
  useGetVideoQuery,
  useLazyGetVideoQuery,
  useUpdateVideoMutation,
} = authSlice;
