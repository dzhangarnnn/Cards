import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "../services/userService";
import { avatarApi } from "../services/avatarService";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [avatarApi.reducerPath]: avatarApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(avatarApi.middleware)
});
