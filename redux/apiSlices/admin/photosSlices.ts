import { api } from "../../api/baseApi";

const _pathName = "/admin/photos";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // --------------------Start----------------------
    getPhotos: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `${_pathName}`,
        params: params,
      }),
      providesTags: ["photo"],
    }),
    addPhotos: builder.mutation<any, any>({
      query: (data) => ({
        url: `${_pathName}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["photo"],
    }),
    updatePhotos: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `${_pathName}/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["photo"],
    }),
    deletePhotos: builder.mutation<any, any>({
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
  useAddPhotosMutation,
  useDeletePhotosMutation,
  useGetPhotosQuery,
  useLazyGetPhotosQuery,
  useUpdatePhotosMutation,
} = authSlice;
