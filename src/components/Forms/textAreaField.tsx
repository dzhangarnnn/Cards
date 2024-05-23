import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  ReactNode,
  TextareaHTMLAttributes
} from "react";

interface ITextAreaFieldProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  type?: string;
  name: string;
  placeholder: string;
  value: string | undefined;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  children: ReactNode;
}

const TextAreaField: FC<ITextAreaFieldProps> = ({
  name,
  value = "",
  onChange,
  placeholder,
  children
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2 -mt-3"
        htmlFor={name}
      >
        {children}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm 
                            rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                             dark:focus:ring-blue-500 dark:focus:border-blue-500 -mt-2"
      />
    </div>
  );
};

export default TextAreaField;
