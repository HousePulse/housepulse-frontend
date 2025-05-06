import React, {FC} from 'react';
import * as styles from './RoomList.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import {FiHome, FiPlus, FiTv} from "react-icons/fi";
import {FaShower} from "react-icons/fa";
import RoomButton from "@components/UI/RoomButton/RoomButton";
import {roomsSelector} from "@store/selectors/selectors";
import RoomIcon from "@components/Sidebar/RoomList/RoomIcon/RoomIcon";

const iconMap = {
  shower: FaShower,
  home: FiHome,
  tv: FiTv,
};


const RoomList: FC = (props) => {
  const rooms = useAppSelector(roomsSelector);
  const dispatch = useAppDispatch();

  return (
      <section className={styles.roomList}>
        <header className={styles.header}>
          <h2 className={styles.title}>Комнаты</h2>
          <button className={styles.add}>
            ＋ Добавить
          </button>
        </header>
        {rooms.map((room, index) => {
          const Icon = iconMap[room.icon];
          return (
              <RoomButton key={index}
                          name={room.title}
                          icon={<RoomIcon icon={<Icon/>} backgroundColor={room.backgroundColor}/>}/>
          )
        })}
      </section>
  );
}

export default RoomList;