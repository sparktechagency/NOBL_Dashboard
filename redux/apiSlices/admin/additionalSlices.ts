import { api } from "../../api/baseApi";

const _pathName = "/admin/pages";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // --------------------Start----------------------
    getPage: builder.query<any, { params: any }>({
      query: ({ params }) => ({
        url: `${_pathName}`,
        params: params,
      }),
      providesTags: ["page"],
    }),
    addPage: builder.mutation<any, any>({
      query: (data) => ({
        url: `${_pathName}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["page"],
    }),

    // --------------------End----------------------
  }),
});

export const { useAddPageMutation, useGetPageQuery, useLazyGetPageQuery } =
  authSlice;
