import { quizApi } from "@/redux/api/apiSlice";

const userApi = quizApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "users/create-user",
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["updateUser"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteUser"],
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    getUserProfile: builder.query({
      query: () => `/auth/profile`,
    }),
    getAllUser: builder.query({
      query: () => `/users`,
      providesTags: ["deleteUser", "updateUser"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useLoginUserMutation,
  useGetAllUserQuery,
  useGetUserProfileQuery,
} = userApi;
