import React, { FC, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { IUser } from "../models/IUser";
import TextAreaField from "./Forms/textAreaField";
import Avatar from "./avatar";
import { useGetQuery } from "../services/avatarService";
import FieldWithStyles from "./Forms/fieldWithLabel";
import Button from "./myButton";
import Modal from "./modal/modal";
import * as Yup from "yup";
import { useFetchAllUsersQuery } from "../services/userService";

interface UserFormProps {
  user?: IUser;
  title: string;
  createOrEditUser: (body: IUser) => void;
}

const UserSchema = Yup.object().shape({
  surname: Yup.string()
    .min(2, "Фамилия должна состоять минимум из двух букв!")
    .required("Поле обязательно для заполнения!"),
  name: Yup.string()
    .min(2, "Имя должно состоять минимум из двух букв!")
    .required("Поле обязательно для заполнения!"),
  email: Yup.string()
    .email("Некорректный email!")
    .required("Поле обязательно для заполнения!")
});

const UserForm: FC<UserFormProps> = ({ user, title, createOrEditUser }) => {
  const { data: users } = useFetchAllUsersQuery(100);
  const { data } = useGetQuery(9);
  const [avatarSrc, setAvatarSrc] = useState("");
  const [avatarsModal, setAvatarsModal] = useState(false);
  const [avatarArrId, setAvatarArrId] = useState([] as Array<string>);

  useEffect(() => {
    if (user?.avatar) {
      setAvatarSrc(user.avatar);
    } else {
      setAvatarSrc("https://cataas.com/cat");
    }
  }, []);

  useEffect(() => {
    if (data) {
      const arr: Array<string> = [];
      for (let i = 1; i < data.length; i++) {
        arr.push(data[i]._id);
      }

      setAvatarArrId(arr);
    }
  }, [data]);

  function validateUniqueEmail(value: string) {
    let error;
    if (users && users.some((user) => user.email === value)) {
      error = "Почта с таким названием уже существует";
    }
    return error;
  }

  function changeAvatarSrcAndModal(id: string) {
    setAvatarSrc(`https://cataas.com/cat/${id}`);
    setAvatarsModal(false);
  }

  const initialValues = user
    ? {
        name: user.name,
        surname: user.surname,
        middlename: user.middlename,
        avatar: user.avatar,
        about: user.about,
        email: user.email
      }
    : {
        name: "",
        surname: "",
        middlename: "",
        avatar: "",
        about: "",
        email: ""
      };

  return (
    <div className="w-full bg-white rounded-lg shadow  mt-2">
      <Avatar avatar={avatarSrc} onClick={() => setAvatarsModal(true)} />

      <Formik
        initialValues={initialValues}
        validationSchema={UserSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const userObj = user
            ? ({ ...values, avatar: avatarSrc, id: user.id } as IUser)
            : ({
                ...values,
                avatar: avatarSrc,
                date: Date.now()
              } as IUser);
          createOrEditUser(userObj);
          if (!user) {
            resetForm();
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values, handleChange, errors, touched }) => (
          <Form className="space-y-4 md:space-y-6">
            <h1></h1>
            <FieldWithStyles name="surname" placeholder="Введите свою фамилию">
              Фамилия
            </FieldWithStyles>
            {errors.surname && touched.surname ? (
              <div>
                <p className="-mt-6 text-red-700">{errors.surname}</p>
              </div>
            ) : null}
            <FieldWithStyles name="name" placeholder="Введите свое имя">
              Имя
            </FieldWithStyles>
            {errors.name && touched.name ? (
              <div>
                <p className="-mt-6 text-red-700">{errors.name}</p>
              </div>
            ) : null}
            <FieldWithStyles
              name="middlename"
              placeholder="Введите свое отчество"
            >
              Отчество
            </FieldWithStyles>

            <FieldWithStyles
              type="email"
              name="email"
              placeholder="Введите свою электронную почту"
              validate={validateUniqueEmail}
            >
              Электронная почта
            </FieldWithStyles>
            {errors.email && touched.email ? (
              <div>
                <p className="-mt-6 text-red-700">{errors.email}</p>
              </div>
            ) : null}

            <TextAreaField
              name="about"
              value={values.about}
              onChange={handleChange}
              placeholder="Расскажите о себе"
            >
              О себе
            </TextAreaField>
            <div className="flex justify-center">
              <Button type="submit" disabled={isSubmitting}>
                {title}
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      {avatarArrId.length && (
        <Modal
          active={avatarsModal}
          setActive={setAvatarsModal}
          translateX="md:-translate-x-1/3 xs:-translate-x-1/4"
        >
          <div className="s:columns-3 columns-2">
            {avatarArrId.map((id) => (
              <Avatar
                key={id}
                avatar={`https://cataas.com/cat/${id}`}
                onClick={() => changeAvatarSrcAndModal(id)}
              />
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserForm;
