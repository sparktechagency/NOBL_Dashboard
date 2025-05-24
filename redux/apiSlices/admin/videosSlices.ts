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
    addVideo: builder.mutation<
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
      invalidatesTags: ["video"],
    }),
    updateVideo: builder.mutation<
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
