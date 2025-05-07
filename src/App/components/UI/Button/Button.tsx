import React, {FC, memo} from 'react';
import * as style from './Button.module.css'

type Props = {
  children?: React.ReactNode,
  className?: string,
  onClick?: (...args: any[]) => any,
}

const Button: FC<Props> = memo(({children, className, onClick}) => {

  return (
      <button className={`${style.button} ${className || ''}`}
              onClick={onClick}>
        {children}
      </button>
  );
});

export default Button;