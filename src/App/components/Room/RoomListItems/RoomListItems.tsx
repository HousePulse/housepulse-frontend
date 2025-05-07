// RoomListItems.tsx
import React, {FC} from 'react';
import * as styles from './RoomListItems.module.css';
import {roomsSelector} from "@store/selectors/selectors";
import {useAppSelector} from "@store/store";
import {FiHome, FiTv} from "react-icons/fi";
import {FaShower} from "react-icons/fa";
import RoomIcon from "@components/Room/RoomIcon/RoomIcon";
import Button from "@components/UI/Button/Button";
import {Room} from "@types_app/room";


type Props = {
  showCount?: boolean;               // показывать ли число задач
  onRoomClick?: (room: Room) => void;
};

const iconMap = {
  shower: FaShower,
  home: FiHome,
  tv: FiTv,
};
const RoomListItems: FC<Props> = ({showCount = true, onRoomClick}) => {
  const rooms = useAppSelector(roomsSelector);

  return (
      <div className={styles.roomList}>
        {rooms.map((room: Room, index) => {
          const Icon = iconMap[room.icon];
          const tasks = room.tasks?.length || 0;

          return (
              <Button
                  key={index}
                  className={styles.roomButton}
                  onClick={() => onRoomClick?.(room)}
              >
                <div className={styles.icon}>
                  <RoomIcon icon={<Icon/>} backgroundColor={room.backgroundColor}/>
                </div>
                <p>{room.title}</p>
                {showCount && (
                    <p className={styles.tasksCount}>
                      {tasks ? tasks : 'нет задач'}
                    </p>
                )}
              </Button>
          );
        })}
      </div>
  );
};

export default RoomListItems;
