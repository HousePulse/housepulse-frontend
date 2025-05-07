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
  const style: React.CSSProperties = position
      ? {
        position: 'fixed',
        top: position.y,
        left: position.x,
        transform: 'translate(-50%, -50%)'
      }
      : {};

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