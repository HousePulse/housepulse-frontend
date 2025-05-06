import React from 'react';
import * as styles from './NavButton.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import {MdKeyboardArrowRight} from "react-icons/md";

type Props = {
  label: string;
  count?: number;
  active?: boolean;
  onClick: () => void;
};

const NavButton: React.FC<Props> = ({label, count, active, onClick}) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  return (
      <button className={`${styles.button} ${active ? styles.active : ''}`} onClick={onClick}>
        <p>{label}</p>
        <div className={styles.rightPlace}>
          {typeof count === 'number' && <span className={styles.count}>{count}</span>}
          <MdKeyboardArrowRight className={styles.arrowIcon}/>
        </div>
      </button>
  );
}

export default NavButton;