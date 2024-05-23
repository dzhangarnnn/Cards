import React, { FC, useState } from "react";
import {
  useDeleteUserMutation,
  useUpdateUserMutation
} from "../services/userService";
import { IUser } from "../models/IUser";
import moment from "moment";
import Button from "./myButton";
import Modal from "./modal/modal";
import UserForm from "./userForm";
import { useNavigate } from "react-router-dom";

interface IUserPageProps {
  user: IUser;
}

const UserPage: FC<IUserPageProps> = ({ user }) => {
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser, { error }] = useDeleteUserMutation();
  const [userEditModalActive, setUserEditModalActive] = useState(false);
  const [userDeleteModal, setUserDeleteModal] = useState(false);
  const navigate = useNavigate();

  const date = user && moment.unix(user.date / 1000).format("DD.MM.YYYY HH:mm");

  const handleUpdate = async (body: IUser) => {
    await updateUser(body);
    setUserEditModalActive(false);
  };
  const handleDelete = async (id: string) => {
    await deleteUser(id);
    if (!error) {
      navigate("/user");
    }
  };

  return (
    <>
      {user && (
        <div className="bg-slate-100 sm:columns-2 h-screen">
          <div className="bg-slate-300 sm:h-screen flex items-center  flex-col w-full p-5 mb-4 break-inside-avoid">
            <img src={user.avatar} className="w-2/3 rounded-lg" alt="Аватар" />
            <div>
              <Button onClick={() => setUserEditModalActive(true)}>
                Редактировать профиль
              </Button>
              <Button onClick={() => setUserDeleteModal(true)}>
                Удалить профиль
              </Button>
            </div>
          </div>
          <div className="mx-auto my-5 p-5  text-center sm:text-start break-inside-avoid">
            <div className="text-3xl ">
              {user.surname} {user.name}{" "}
              {user.middlename ? user.middlename : ""}
            </div>
            <div className="mt-3 text-xl italic">Почта: {user.email}</div>
            <div className="mt-1 text-lg italic">Даты регистрации: {date}</div>
            {user.about && (
              <div className="mt-5 text-xl ">О себе: {user.about}</div>
            )}
          </div>
          <Modal
            active={userEditModalActive}
            setActive={setUserEditModalActive}
          >
            <UserForm
              title="Сохранить изменения"
              createOrEditUser={handleUpdate}
              user={user}
            />
          </Modal>
          <Modal active={userDeleteModal} setActive={setUserDeleteModal}>
            <div className="text-center pb-2">
              Вы точно уверены, что хотите удалить профиль?
            </div>
            <div className="flex flex-row justify-around">
              <Button onClick={() => handleDelete(user.id)}>Да</Button>
              <Button onClick={() => setUserDeleteModal(false)}>Нет</Button>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default UserPage;
