import React, { useState } from "react";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useFetchAllUsersQuery
} from "../services/userService";
import UserCard from "./userCard";
import _ from "lodash";
import { IUser } from "../models/IUser";
import Button from "./myButton";
import Modal from "./modal/modal";
import UserForm from "./userForm";
import LoadSpinner from "./loader";

const UserContainer = () => {
  const { data: users, isLoading, error } = useFetchAllUsersQuery(20);
  const [deleteUser] = useDeleteUserMutation();
  const [createUser] = useCreateUserMutation();
  const [userCreateModalActive, setUserCreateModalActive] = useState(false);
  const [userDeleteModal, setUserDeleteModal] = useState(false);
  const [usersListToDelete, setUserListToDelete] = useState([] as IUser[]);

  const sortedUsers = users && (_.orderBy(users, "date", "asc") as IUser[]);

  const handleCreate = async (body: IUser) => {
    await createUser(body);
    setUserCreateModalActive(false);
  };

  const handlerList = (id: string) => {
    if (users && !usersListToDelete.find((u) => u.id === id)) {
      const obj = users.find((u) => id === u.id) as IUser;
      setUserListToDelete((prevState) => [...prevState, obj]);
    } else {
      setUserListToDelete((prevState) => prevState.filter((u) => u.id !== id));
    }
  };
  const handleDelete = async (arr: IUser[]) => {
    const arrIdRequets = arr.map((u) => deleteUser(u.id));
    try {
      await Promise.allSettled(arrIdRequets);
    } catch (error) {
      console.log(error);
    }
    setUserDeleteModal(false);
  };

  return (
    <>
      {isLoading && <LoadSpinner />}
      {error && <h1>Произошла ошибка при загрузке</h1>}
      <div className="h-screen pt-4 px-4  bg-orange-200">
        {!isLoading && (
          <div className="flex flex-col sm:flex-row justify-start">
            <Button onClick={() => setUserCreateModalActive(true)}>
              Добавить пользователя
            </Button>
            <div className={usersListToDelete.length ? "visible" : "invisible"}>
              <Button onClick={() => setUserDeleteModal(true)}>Удалить</Button>
            </div>
          </div>
        )}
        <div className="pt-4 sm:columns-2 md:columns-3  gap-4">
          {sortedUsers &&
            sortedUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                handlerList={handlerList}
                list={usersListToDelete}
              />
            ))}
        </div>
        <Modal
          active={userCreateModalActive}
          setActive={setUserCreateModalActive}
        >
          <UserForm
            title="Создать пользователя"
            createOrEditUser={handleCreate}
          />
        </Modal>
        <Modal active={userDeleteModal} setActive={setUserDeleteModal}>
          <p className="text-center text-2xl pb-2">
            Удалить выбранных пользователей?
          </p>
          <ul className="ml-5 pl-5">
            {usersListToDelete.map((user) => (
              <li key={user.id}>
                {user.surname} {user.name} {user.middlename && user.middlename}
              </li>
            ))}
          </ul>
          <div className="flex flex-row justify-around">
            <Button onClick={() => handleDelete(usersListToDelete)}>Да</Button>
            <Button onClick={() => setUserDeleteModal(false)}>Нет</Button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default UserContainer;
