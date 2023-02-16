import api from "./api";

const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<any, string>({
        query: () => `users`,
        providesTags: [{ type: "Users", id: "LIST" }],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: `DELETE`,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    createUser: build.mutation({
      query: (user) => ({
        url: `signup`,
        method: `POST`,
        body: user,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateUser: build.mutation({
      query: (user) => ({
        url: `users/${user?.id}`,
        method: `PUT`,
        body: user,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Users", id }],
    }),
    getUser: build.query({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUserQuery
} = usersApi;
