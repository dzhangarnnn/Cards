import React, { FC, useEffect, useState } from "react";
import { IUser } from "../models/IUser";
import Avatar from "./avatar";
import { useNavigate } from "react-router-dom";

interface UserCardProps {
  user: IUser;
  handlerList: (id: string) => void;
  list: IUser[];
}

const UserCard: FC<UserCardProps> = ({ user, handlerList, list }) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    if (list.length && list.find((u) => u.id === user.id)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [list]);

  const handleClick = () => {
    navigate(`/users/${user.id}`);
  };

  return (
    <div
      className={`${isChecked ? "bg-sky-700 " : "bg-slate-200 "}box-border w-auto h-full  shadow-lg 
        mb-4 pb-4 text-center rounded-md break-inside-avoid `}
    >
      <div className="pt-4 cursor-pointer" onClick={() => handlerList(user.id)}>
        <Avatar avatar={user.avatar} />
      </div>
      <div onClick={handleClick}>
        <div className="text-lg cursor-pointer">
          {user.surname} {user.name}
        </div>
        <div className="text-lg cursor-pointer ">{user.middlename}</div>
        <div className="italic"> {user.email}</div>
      </div>
    </div>
  );
};

export default UserCard;
