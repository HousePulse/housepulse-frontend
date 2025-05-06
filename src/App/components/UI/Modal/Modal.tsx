import React, {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@store/store";
import * as styles from "./Modal.module.css";

export enum ModalSize {
  small = "small",
  medium = "medium",
  big = "big",
}

type Props = {
  children?: React.ReactNode,
  size?: ModalSize,
  onClickBackdrop?: (...args: any[]) => any,
}

const Modal: FC<Props> = ({children, size = ModalSize.medium, onClickBackdrop}) => {
  const [isOpen, setIsOpen] = useState(false);
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  return (
      <div className={styles.backdrop} onClick={() => {
        if (onClickBackdrop) {
          onClickBackdrop();
          return;
        }
        setIsOpen(!isOpen);
      }}>
        <div className={`${styles.window} ${styles[size]}`} onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
  );
}

export default Modal;