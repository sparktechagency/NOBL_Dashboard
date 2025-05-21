import { api } from "../../api/baseApi";

const dashboard = api.injectEndpoints({
  endpoints: (builder) => ({
    // --------------------Start----------------------

    getDashboard: builder.query<any, { params?: any }>({
      query: ({ params }) => ({
        url: `/admin/dashboard`,
        params: params,
      }),
      providesTags: ["dashboard"],
    }),

    // --------------------End----------------------
  }),
});

export const { useGetDashboardQuery } = dashboard;
