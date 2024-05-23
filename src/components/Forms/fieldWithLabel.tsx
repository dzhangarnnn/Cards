import { Field } from "formik";
import React, { FC, ReactNode } from "react";

interface FieldWithStylesProps {
  type?: string;
  name: string;
  placeholder: string;
  children: ReactNode;
  validate?: (value: string) => string | undefined;
}

const FieldWithStyles: FC<FieldWithStylesProps> = ({
  type = "text",
  name,
  placeholder,
  children,
  ...rest
}) => {
  return (
    <div className="mb-4 ">
      <label
        className="block text-gray-700 text-sm font-bold mb-2 -mt-2"
        htmlFor={name}
      >
        {children}
      </label>
      <Field
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        {...rest}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm 
                    rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                     dark:focus:ring-blue-500 dark:focus:border-blue-500 -mt-1"
      />
    </div>
  );
};

export default FieldWithStyles;
