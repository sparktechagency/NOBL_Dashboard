import { api } from "../../api/baseApi";

const _pathName = "/admin/audios";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // --------------------Start----------------------
    getAudios: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `${_pathName}`,
        params: params,
      }),
      providesTags: ["audio"],
    }),
    addAudios: builder.mutation<any, any>({
      query: (data) => ({
        url: `${_pathName}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["audio"],
    }),
    updateAudios: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `${_pathName}/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["audio"],
    }),
    deleteAudios: builder.mutation<any, any>({
      query: (id) => ({
        url: `${_pathName}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["audio"],
    }),

    // --------------------End----------------------
  }),
});

export const {
  useAddAudiosMutation,
  useDeleteAudiosMutation,
  useGetAudiosQuery,
  useLazyGetAudiosQuery,
  useUpdateAudiosMutation,
} = authSlice;
