import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../models/IUser";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    fetchAllUsers: build.query<IUser[], number>({
      query: (limit = 9) => ({
        url: "/users",
        params: {
          _limit: limit
        }
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Users" as const, id })),
              { type: "Users", id: "LIST" }
            ]
          : [{ type: "Users", id: "LIST" }]
    }),
    createUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }]
    }),
    updateUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: "PUT",
        body: user
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }]
    }),
    deleteUser: build.mutation<IUser, string>({
      query: (...id) => ({
        url: `/users/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }]
    })
  })
});

export const {
  useFetchAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = usersApi;
