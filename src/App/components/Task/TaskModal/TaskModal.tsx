import React from 'react';
import * as styles from './TaskModal.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import {Task} from "@types_app/task";
import {FiChevronLeft, FiMoreVertical} from "react-icons/fi";
import Modal from "@components/UI/Modal/Modal";
import Textarea from "@components/UI/Textarea/Textarea";
import Input from "@components/UI/Input/Input";
import {Point} from "@types_app/general";
import RoomPicker from "@components/Room/RoomPicker/RoomPicker";
import {roomsSelector} from "@store/selectors/selectors";
import {Room} from "@types_app/room";
import {getIconByRoom, RoomIconSize} from "@components/Room/RoomIcon/RoomIcon";
import {RepeatChooser} from "@components/Task/RepeatChooser/RepeatChooser";
import {diffInDays} from "@utils/date";

type Props = {
  task: Task;
  onClose: () => void
};

const TaskModal: React.FC<Props> = ({task, onClose}) => {
  const rooms = useAppSelector(roomsSelector);
  const room: Room | undefined = rooms.find(r => r.title === task.room)

  const dispatch = useAppDispatch();

  const [point, setPoint] = React.useState<Point | null>(null);

  const diffDays = diffInDays(task.date, new Date());
  const isExpired = diffDays >= 1;

  const roomPickerOpenHandler = (e: React.MouseEvent) => {
    const point_: Point = {
      x: e.clientX,
      y: e.clientY
    }

    setPoint(point_);
  }

  const closeRoomPicker = () => {
    setPoint(null);
  }

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <header className={styles.head}>
          <button className={styles.back} onClick={onClose}><FiChevronLeft/> Назад</button>
          <span className={styles.title}>Детали задачи</span>
          <FiMoreVertical className={styles.menu}/>
        </header>

        <div className={styles.paramsContainer}>
          <div className={styles.combineContainer}>
            <div className={styles.row}>
              <Input text={task.title}/>
            </div>
            <div className={styles.row}>
              <Textarea text={task.description}/>
            </div>
          </div>

          <div className={styles.combineContainer}>
            <div className={styles.row}
                 onClick={roomPickerOpenHandler}>
              <p>Комната</p>
              <span className={styles.inline}>
              {getIconByRoom(room, RoomIconSize.small)}
                <p className={styles.value}>{task.room}</p>
            </span>
            </div>

            <div className={styles.row}>
              <p>Повтор</p>
              <RepeatChooser onChange={rule => console.log('Новое правило:', rule)}/>
            </div>

            <div className={styles.row}>
              <div className={styles.block}>
                <p>Срок</p>
                {isExpired &&
                    <p className={styles.overdue}>Просрочена {diffDays} д</p>
                }
              </div>
              <button className={styles.dueToButton}>пн, 5 мая</button>
            </div>

            <div className={styles.row}>
              <p>Напоминание</p>
              <input type="checkbox"/>
            </div>
          </div>

          <div className={styles.combineContainer}>
            <div className={styles.row}>
              <p>Назначить задачу</p>
            </div>
          </div>
        </div>


        <footer className={styles.footer}>
          <button className={styles.ok}>✓ Выполнить</button>
          <button className={styles.skip}>→ Пропустить</button>
        </footer>

        {point && <RoomPicker position={point}
                              task={task}
                              onClose={closeRoomPicker}/>}
      </div>
    </Modal>
  );
}

export default TaskModal;