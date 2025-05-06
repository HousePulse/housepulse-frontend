import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "@store/store";
import * as styles from "./Sidebar.module.css";
import NavButton from "@components/Sidebar/NavButton/NavButton";
import RoomList from "@components/Sidebar/RoomList/RoomList";
import SettingsButton from "@components/Settings/SettingsButton/SettingsButton";
import SettingsModal from "@components/Settings/SettingsModal/SettingsModal";
import {IoIosArrowDown} from "react-icons/io";

type Props = {
  activeView: string;
  onChangeView: (view: any) => void;
};

const Sidebar: React.FC<Props> = ({activeView, onChangeView}) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const sidebarActive = global.sidebarActive;

  const chooseHomeHandler = () => {

  }

  return (
      <aside className={`${styles.sidebar} ${sidebarActive ? styles.active : ''}`}>
        <header className={styles.header}>
          <SettingsButton onClick={() => setSettingsOpen(true)}/>
          <div className={styles.title}>
            <h1>Дом</h1>
            <IoIosArrowDown className={styles.chevron} onClick={chooseHomeHandler}/>
          </div>
        </header>

        <nav className={styles.nav}>
          <NavButton
              label="График"
              active={activeView === 'schedule'}
              onClick={() => onChangeView('schedule')}
          />
          <NavButton label="Все задачи" count={0} active={activeView === 'all'} onClick={() => onChangeView('all')}/>
          <NavButton label="История" count={0} active={activeView === 'history'}
                     onClick={() => onChangeView('history')}/>
          <NavButton label="Статистика" active={activeView === 'stats'} onClick={() => onChangeView('stats')}/>
        </nav>

        <RoomList/>
        {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)}/>}
      </aside>
  );
}

export default Sidebar;