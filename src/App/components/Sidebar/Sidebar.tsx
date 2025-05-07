import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "@store/store";
import * as styles from "./Sidebar.module.css";
import * as buttonStyles from "@components/UI/Button/Button.module.css";
import RoomList from "@components/Room/RoomList/RoomList";
import SettingsModal from "@components/Settings/SettingsModal/SettingsModal";
import {IoIosArrowDown, IoIosSettings} from "react-icons/io";
import {PageRouter, pageRoutersName, pageRoutes} from "@root/App/App";
import {tasksSelector} from "@store/selectors/selectors";
import {MdKeyboardArrowRight} from "react-icons/md";
import {NavLink} from "react-router-dom";

type Props = {};

const Sidebar: React.FC<Props> = () => {
  const global = useAppSelector(state => state.global);
  const tasks = useAppSelector(tasksSelector);
  const dispatch = useAppDispatch();

  const [settingsOpen, setSettingsOpen] = useState(false);

  const sidebarActive = global.sidebarActive;
  const chooseHomeHandler = () => {

  }

  return (
      <aside className={`${styles.sidebar} ${sidebarActive ? styles.active : ''}`}>
        <header className={styles.header}>
          <button className={styles.settingsButton}
                  onClick={() => setSettingsOpen(true)}
                  title="Настройки">
            <IoIosSettings/>
          </button>
          <div className={styles.title}>
            <h1>Дом</h1>
            <IoIosArrowDown className={styles.chevron} onClick={chooseHomeHandler}/>
          </div>
        </header>

        <nav className={styles.nav}>
          {pageRoutes.map((pageRoute: PageRouter, index: number) => {
            let count = null;

            switch (pageRoute.path.slice(1)) {
              case pageRoutersName.all_tasks:
                count = tasks.filter(task => !task.done).length;
                break;
              case pageRoutersName.history:
                count = tasks.filter(task => task.done).length;
                break;
            }

            return (
                <NavLink key={index}
                         to={pageRoute.path} end
                         className={({isActive}) =>
                             `${buttonStyles.button} ${styles.sidebarNavButton} ${isActive ? styles.active : ''}`
                         }>
                  <p>{pageRoute.title}</p>

                  <div className={styles.rightPlace}>
                    {count && <span className={styles.count}>{count}</span>}
                    <MdKeyboardArrowRight className={styles.arrowIcon}/>
                  </div>
                </NavLink>
            )
          })}
        </nav>

        <RoomList/>
        {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)}/>}
      </aside>
  );
}

export default Sidebar;