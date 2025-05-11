import React, {FC, memo, useEffect, useState} from 'react';
import * as styles from "./Modal.module.css";
import {Point} from "@types_app/general"

export enum ModalSize {
  fit = "fit",
  verySmall = "very-small",
  small = "small",
  medium = "medium",
  big = "big",
}

type Props = {
  children?: React.ReactNode,
  size?: ModalSize,
  onClose: (...args: any[]) => any,
  position?: Point,
}

const Modal: FC<Props> = memo(({children, size = ModalSize.medium, onClose, position}) => {
  let style: React.CSSProperties = {};
  if (position) {
    let pos_: any = {
      top: position.y,
      left: position.x,
    }

    if (position.x > window.innerWidth * 0.7) {
      pos_.left = null;
      pos_ = {
        ...pos_,
        right: window.innerWidth - position.x,
      }
    }
    if (position.y > window.innerHeight * 0.7) {
      pos_.top = null;
      pos_ = {
        ...pos_,
        bottom: window.innerHeight - position.y,
      }
    }

    style = {
      position: 'fixed',
      ...pos_,
      // transform: 'translate(-5%, -5%)'
    };
  }

  return (
      <div className={styles.backdrop}
           onClick={onClose}>
        <div className={`${styles.window} ${styles[size]}`}
             onClick={e => e.stopPropagation()}
             style={style}>
          {children}
        </div>
      </div>
  );
});

export default Modal;