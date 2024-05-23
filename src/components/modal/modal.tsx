import React, { FC, ReactNode } from "react";
import s from "./modal.module.css";

interface IModalProps {
  active: boolean;
  setActive: (arg: boolean) => void;
  children: ReactNode;
  translateX?: string;
  translateY?: string;
  position?: string;
}

const Modal: FC<IModalProps> = ({
  active,
  setActive,
  children,
  translateX = "",
  translateY = "",
  position = "fixed"
}) => {
  return (
    <div
      className={`${position} ${active ? `${s.modal} ${s.active}` : s.modal}`}
      onClick={() => setActive(false)}
    >
      <div
        className={`${translateX} ${translateY} ${active ? `${s.modal_content} ${s.active}` : s.modal_content}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
