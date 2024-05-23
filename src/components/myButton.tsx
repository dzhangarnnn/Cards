import React, { FC } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  type = "button",

  children,
  ...rest
}) => {
  return (
    <button
      type={type}
      className=" rounded-lg px-2 py-1 bg-gray-400 mx-1 my-2
                 hover:bg-gray-300 hover:text-stone-500"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
