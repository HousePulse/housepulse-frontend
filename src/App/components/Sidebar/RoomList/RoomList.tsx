import React, {FC} from 'react';
import * as styles from './RoomList.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import {FiHome, FiPlus, FiTv} from "react-icons/fi";
import {FaShower} from "react-icons/fa";
import RoomItem from "@components/Sidebar/RoomItem/RoomItem";
import RoomIcon, {IconBackgroundColor} from "@components/Sidebar/RoomList/RoomIcon/RoomIcon";

const rooms = [
  {name: 'Ванная', icon: <RoomIcon icon={<FaShower/>} backgroundColor={IconBackgroundColor.Cyan}/>},
  {name: 'Весь дом', icon: <RoomIcon icon={<FiHome/>} backgroundColor={IconBackgroundColor.Green}/>},
  {name: 'Гостиная', icon: <RoomIcon icon={<FiTv/>} backgroundColor={IconBackgroundColor.Red}/>},
];

const RoomList: FC = (props) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  return (
      <section className={styles.roomList}>
        <header className={styles.header}>
          <h2 className={styles.title}>Комнаты</h2>
          <button className={styles.add}>
            <FiPlus/>
            Добавить
          </button>
        </header>
        {rooms.map((r) => (
            <RoomItem key={r.name} name={r.name} icon={r.icon}/>
        ))}
      </section>
  );
}

export default RoomList;