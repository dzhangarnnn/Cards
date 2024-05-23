import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useFetchAllUsersQuery } from "../services/userService";
import UserPage from "./userPage";
import { IUser } from "../models/IUser";
import LoadSpinner from "./loader";

const UserPageContainer = () => {
  const { id } = useParams();
  const { data: users, isLoading, error } = useFetchAllUsersQuery(40);

  const user: IUser | undefined = users?.filter((user) => id === user.id)[0];

  if (isLoading) {
    return <LoadSpinner />;
  }
  if (error) {
    return error && <h1>Произошла ошибка при загрузке</h1>;
  }

  if (user) {
    return <UserPage user={user} />;
  } else {
    return <Navigate to="/" />;
  }
};

export default UserPageContainer;
