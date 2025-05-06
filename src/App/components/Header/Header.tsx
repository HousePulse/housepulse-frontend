import React, {FC} from 'react';
import * as styles from './Header.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import {BsLayoutSidebar} from "react-icons/bs";
import {CiSearch} from "react-icons/ci";
import {setSidebarActive} from "@store/globalSlice";

const Header: FC = (props) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  const sidebarActive = global.sidebarActive;

  const toggleSidebar = () => {
    dispatch(setSidebarActive(!sidebarActive));
  }

  return (
      <div className={styles.headerButtons}>
        <button onClick={toggleSidebar}>
          <BsLayoutSidebar/>
        </button>
        <button onClick={() => {
        }}>
          <CiSearch/>
        </button>
      </div>
  );
}

export default Header;