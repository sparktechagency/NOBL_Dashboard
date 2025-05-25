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
    addAudios: builder.mutation<
      any,
      {
        data: FormData;
        onUploadProgress?: (progressEvent: ProgressEvent) => void;
      }
    >({
      query: ({ data, onUploadProgress }) => {
        const config: any = {
          url: `${_pathName}`,
          method: "POST",
          body: data,
        };

        if (onUploadProgress) {
          config.onUploadProgress = onUploadProgress;
        }

        return config;
      },
      invalidatesTags: ["audio"],
    }),
    updateAudios: builder.mutation<
      any,
      {
        id: string;
        data: FormData;
        onUploadProgress?: (progressEvent: ProgressEvent) => void;
      }
    >({
      query: ({ id, data, onUploadProgress }) => {
        const config: any = {
          url: `${_pathName}/${id}`,
          method: "POST",
          body: data,
        };

        if (onUploadProgress) {
          config.onUploadProgress = onUploadProgress;
        }

        return config;
      },
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
