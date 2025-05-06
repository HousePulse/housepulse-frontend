import React, {FC} from 'react';
import * as styles from './RoomList.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import {FiHome, FiPlus, FiTv} from "react-icons/fi";
import {FaShower} from "react-icons/fa";
import RoomButton from "@components/UI/RoomButton/RoomButton";
import RoomIcon from "@components/Sidebar/RoomList/RoomIcon/RoomIcon";
import {IconBackgroundColor} from "@types_app/room";
import {roomsSelector} from "@store/selectors/selectors";

const RoomList: FC = (props) => {
  const rooms = useAppSelector(roomsSelector);
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
        {rooms.map((r, index) => (
            <RoomButton key={index} name={r.title} icon={r.icon}/>
        ))}
      </section>
  );
}

export default RoomList;