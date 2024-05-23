import React, { FC } from "react";

interface IAvatarProps {
  avatar: string;
  onClick?: () => void;
}

const Avatar: FC<IAvatarProps> = ({ avatar, ...rest }) => {
  return (
    <img
      className="h-40 w-40 mx-auto rounded-md mb-3 cursor-pointer"
      src={avatar}
      alt="Аватар"
      {...rest}
    />
  );
};

export default Avatar;
