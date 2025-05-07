import React, {FC, memo} from 'react';
import * as styles from "./Modal.module.css";
import {Point} from "@types_app/general";

export enum ModalSize {
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
    let blockPos: any = {
      left: position.x,
    }

    if (position.x > window.innerWidth * 0.7) {
      blockPos = {
        right: window.innerWidth - position.x,
      }
    }

    style = {
      position: 'fixed',
      top: position.y,
      ...blockPos,
      transform: 'translate(-5%, -5%)'
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