import { api } from "../../api/baseApi";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // --------------------Start----------------------
    // ---------------Home --------------
    getHome: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `/home`,
        params: params,
      }),
      providesTags: ["home"],
    }),
    //------------- Global Category ---------------
    getCategory: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `/get-category`,
        params: params,
      }),
      providesTags: ["category"],
    }),
    //--------------- Photos --------------------
    getPhotos: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `/photos`,
        params: params,
      }),
      providesTags: ["photo"],
    }),
    //-------------- Videos --------------
    getVideos: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `/videos`,
        params: params,
      }),
      providesTags: ["video"],
    }),
    getComments: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `/video-comment`,
        params: params,
      }),
      providesTags: ["video"],
    }),
    relatedVideos: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `/related-videos`,
        params: params,
      }),
      providesTags: ["video"],
    }),
    //-------------- Audios --------------
    getAudios: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `/audios`,
        params: params,
      }),
      //   providesTags: [""],
    }),
    relatedAudios: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `/related-audios`,
        params: params,
      }),
      //   providesTags: ["user"],
    }),
    //-------------- Documents --------------
    getDocument: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `/documents`,
        params: params,
      }),
      providesTags: ["document"],
    }),
    //-------------- Links --------------
    getLinks: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `/links`,
        params: params,
      }),
      providesTags: ["links"],
    }),
    //-------------- Additional Page --------------
    getAdditionalPage: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `/pages`,
        params: params,
      }),
      //   providesTags: ["user"],
    }),
    //-------------- Open App auto Hiter --------------
    getAppOpen: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `/app-open-count`,
        params: params,
      }),
      //   providesTags: ["user"],
    }),

    //---------- post comments for videos -------------

    postComment: builder.mutation<any, { params: any; data: any }>({
      query: ({ params, data }) => ({
        url: `/video-comment`,
        params: params,
        body: data,
      }),
      invalidatesTags: ["video"],
    }),

    // --------------------End----------------------
  }),
});

export const {
  useGetHomeQuery,
  useLazyGetHomeQuery,
  useGetAdditionalPageQuery,
  useGetAppOpenQuery,
  useGetAudiosQuery,
  useGetCategoryQuery,
  useGetCommentsQuery,
  useGetDocumentQuery,
  useGetLinksQuery,
  useGetPhotosQuery,
  useGetVideosQuery,
  usePostCommentMutation,
  useRelatedAudiosQuery,
  useRelatedVideosQuery,
  useLazyGetAdditionalPageQuery,
  useLazyGetAppOpenQuery,
  useLazyGetAudiosQuery,
  useLazyGetCategoryQuery,
  useLazyGetCommentsQuery,
  useLazyGetDocumentQuery,
  useLazyGetLinksQuery,
  useLazyGetPhotosQuery,
  useLazyGetVideosQuery,
  useLazyRelatedAudiosQuery,
  useLazyRelatedVideosQuery,
} = authSlice;
