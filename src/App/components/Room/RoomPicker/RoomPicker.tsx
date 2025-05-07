import React, {FC} from 'react';
import * as styles from './RoomPicker.module.css';

import {useAppDispatch, useAppSelector} from "@store/store";
import Modal, {ModalSize} from "@components/UI/Modal/Modal";
import {Point} from "@types_app/general";
import RoomListItems from "@components/Room/RoomListItems/RoomListItems";
import {Task} from "@types_app/task";
import {updateTask} from "@store/userSlice";
import {Room} from "@types_app/room";

type Props = {
  onClose: (...args: any[]) => any;
  position: Point;
  task: Task;
}

const RoomPicker: FC<Props> = ({position, onClose, task}) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  return (
      <Modal onClose={onClose}
             position={position}
             size={ModalSize.small}>
        <div className={styles.pickerContainer}>
          <div className={styles.pickerHeader}>
            <button onClick={onClose}>❮ Назад</button>
            <h4>Выберите комнату</h4>
          </div>

          <div className={styles.roomList}>
            <RoomListItems showCount={false}
                           onRoomClick={(room: Room) => {
                             // TODO: сделать изменение не сразу в store, а сначала в temp объекте
                             dispatch(updateTask({
                               ...task,
                               room: room.title
                             }));
                             onClose();
                           }}/>
          </div>
        </div>
      </Modal>
  );
}

export default RoomPicker;