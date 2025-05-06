import React, {FC, memo, useState} from 'react';
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
  onClose: (...args: any[]) => any,
  isOpen: boolean,
}

const Modal: FC<Props> = memo(({children, size = ModalSize.medium, onClose, isOpen}) => {
  if (!isOpen) {
    return null;
  }

  return (
      <div className={styles.backdrop} onClick={onClose}>
        <div className={`${styles.window} ${styles[size]}`} onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
  );
});

export default Modal;