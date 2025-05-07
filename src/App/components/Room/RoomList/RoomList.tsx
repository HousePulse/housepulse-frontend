import React, {FC} from 'react';
import * as styles from './RoomList.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import {roomsSelector} from "@store/selectors/selectors";
import RoomListItems from "@components/Room/RoomListItems/RoomListItems";


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
        <RoomListItems onRoomClick={(roomId) => {}}/>
      </section>
  );
}

export default RoomList;