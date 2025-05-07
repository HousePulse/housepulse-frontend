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

const Row: React.FC<{
  label: string,
  value?: string,
  rightIcon?: React.ReactNode,
  children?: React.ReactNode,
  onClick?: (...args: any[]) => any
}> = ({label, value, rightIcon, children, onClick}) => (
    <div className={styles.row}
         onClick={onClick}>
      <p>{label}</p>
      {value && <p className={styles.value}>{value}</p>}
      {children}
      {rightIcon && <p className={styles.icon}>{rightIcon}</p>}
    </div>
);

type Props = {
  task: Task;
  onClose: () => void
};

const TaskModal: React.FC<Props> = ({task, onClose}) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  const [point, setPoint] = React.useState<Point | null>(null)

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
        <header className={styles.head}>
          <button className={styles.back} onClick={onClose}><FiChevronLeft/> Назад</button>
          <span className={styles.title}>Детали задачи</span>
          <FiMoreVertical className={styles.menu}/>
        </header>

        <Input text={task.title}/>
        <Textarea text={task.description}/>

        <div className={styles.params}>
          <Row label="Комната"
               value={task.room}
               onClick={roomPickerOpenHandler}/>
          <Row label="Повтор" value="Каждые 2 недели" rightIcon="▼"/>
          <Row label="Срок">
            <button className={styles.dueBtn}>пн, 5 мая</button>
            <span className={styles.overdue}>Просрочена 1 д</span>
          </Row>
          <Row label="Напоминание">
            <input type="checkbox"/>
          </Row>
        </div>

        <button className={styles.locked}>Назначить задачу 🔒</button>

        <footer className={styles.footer}>
          <button className={styles.ok}>✓ Выполнить</button>
          <button className={styles.skip}>→ Пропустить</button>
        </footer>

        {point && <RoomPicker position={point}
                              task={task}
                              onClose={closeRoomPicker}/>}
      </Modal>
  );
}

export default TaskModal;