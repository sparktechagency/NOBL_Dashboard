import { api } from "../../api/baseApi";

const _pathName = "/admin/video-comment";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // --------------------Start----------------------
    getComments: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `${_pathName}`,
        params: params,
      }),
      providesTags: ["video"],
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
  useDeleteVideoMutation,
  useGetCommentsQuery,
  useLazyGetCommentsQuery,
} = authSlice;
