import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAvatar } from "../models/IAvatar";

export const avatarApi = createApi({
  reducerPath: "avatarApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://cataas.com" }),
  endpoints: (build) => ({
    get: build.query<IAvatar[], number>({
      query: (limit = 9) => ({
        url: "/api/cats",
        limit: limit,
        headers: { "Content-Type": "application/json" }
      })
    })
  })
});

export const { useGetQuery } = avatarApi;
