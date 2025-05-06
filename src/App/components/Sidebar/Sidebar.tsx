import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "@store/store";
import * as styles from "./Sidebar.module.css";
import SidebarNavButton from "@components/UI/SidebarNavButton/SidebarNavButton";
import RoomList from "@components/Sidebar/RoomList/RoomList";
import SettingsModal from "@components/Settings/SettingsModal/SettingsModal";
import {IoIosArrowDown, IoIosSettings} from "react-icons/io";
import {PageRouter, pageRoutersName, pageRoutes} from "@root/App/App";
import {tasksSelector} from "@store/selectors/selectors";

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
          {
            pageRoutes.map((pageRoute: PageRouter, index: number) => {
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
                  <SidebarNavButton
                      key={index}
                      label={pageRoute.title}
                      count={count}
                      routerPath={pageRoute.path}
                  />
              )
            })
          }
        </nav>

        <RoomList/>
        <SettingsModal onClose={() => setSettingsOpen(false)}
                       isOpen={settingsOpen}/>
      </aside>
  );
}

export default Sidebar;