// RoomListItems.tsx
import React, {FC} from 'react';
import * as styles from './RoomListItems.module.css';
import {roomsSelector} from "@store/selectors/selectors";
import {useAppSelector} from "@store/store";
import Button from "@components/UI/Button/Button";
import {Room} from "@types_app/room";
import {getIconByRoom} from "@components/Room/RoomIcon/RoomIcon";


type Props = {
  showCount?: boolean;               // показывать ли число задач
  onRoomClick?: (room: Room) => void;
};


const RoomListItems: FC<Props> = ({showCount = true, onRoomClick}) => {
  const rooms = useAppSelector(roomsSelector);

  return (
      <div className={styles.roomList}>
        {rooms.map((room: Room, index) => {
          const tasks = room.tasks?.length || 0;

          return (
              <Button
                  key={index}
                  className={styles.roomButton}
                  onClick={() => onRoomClick?.(room)}
              >
                {getIconByRoom(room)}
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
