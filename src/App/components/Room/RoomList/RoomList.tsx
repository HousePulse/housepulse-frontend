import React, {FC} from 'react';
import * as styles from './RoomList.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import {FiHome, FiTv} from "react-icons/fi";
import {FaShower} from "react-icons/fa";
import {roomsSelector} from "@store/selectors/selectors";
import RoomIcon from "@components/Room/RoomIcon/RoomIcon";
import Button from "@components/UI/Button/Button";

const iconMap = {
  shower: FaShower,
  home: FiHome,
  tv: FiTv,
};


const RoomList: FC = (props) => {
  const rooms = useAppSelector(roomsSelector);
  const dispatch = useAppDispatch();

  return (
      <section className={styles.roomListContainer}>
        <header className={styles.header}>
          <h2 className={styles.title}>Комнаты</h2>
          <button className={styles.add}>
            ＋ Добавить
          </button>
        </header>
        <div className={styles.roomList}>
          {rooms.map((room, index) => {
            const Icon = iconMap[room.icon];
            const tasks = 0;

            return (
                <Button key={index}
                        className={styles.roomButton}>
                  <div className={styles.icon}>{<RoomIcon icon={<Icon/>} backgroundColor={room.backgroundColor}/>}</div>
                  <p>{room.title}</p>
                  <p className={styles.tasksCount}>{tasks ? tasks : 'нет задач'}</p>
                </Button>
            )
          })}
        </div>
      </section>
  );
}

export default RoomList;