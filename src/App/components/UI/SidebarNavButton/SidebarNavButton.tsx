import React from 'react';
import * as styles from './SidebarNavButton.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import {MdKeyboardArrowRight} from "react-icons/md";
import {NavLink} from "react-router-dom";

type Props = {
  label: string;
  count?: number | null;
  routerPath: string
};

const SidebarNavButton: React.FC<Props> = ({label, count, routerPath}) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  return (
      <NavLink to={routerPath} end
               className={({isActive}) =>
                   `${styles.button} ${isActive ? styles.active : ''}`
               }>
        <p>{label}</p>

        <div className={styles.rightPlace}>
          {count && <span className={styles.count}>{count}</span>}
          <MdKeyboardArrowRight className={styles.arrowIcon}/>
        </div>
      </NavLink>
  );
}

export default SidebarNavButton;