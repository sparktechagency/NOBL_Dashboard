import { api } from "../api/baseApi";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // --------------------Start----------------------
    getProfile: builder.query<any, any>({
      query: () => ({
        url: `/auth/profile`,
      }),
      providesTags: ["user"],
    }),
    login: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    forgotPassword: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    verifyOtp: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/verify-otp`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    resetPassword: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    changePassword: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/change-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    updateProfile: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/update-profile`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    logout: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/logout`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),

    // --------------------End----------------------
  }),
});

export const {
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useVerifyOtpMutation,
} = authSlice;
