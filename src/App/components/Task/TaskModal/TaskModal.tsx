import React from 'react';
import * as styles from './TaskModal.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import {Task} from "@types_app/task";
import {FiChevronLeft, FiMoreVertical} from "react-icons/fi";
import Modal, {ModalSize} from "@components/UI/Modal/Modal";
import Textarea from "@components/UI/Textarea/Textarea";
import Input from "@components/UI/Input/Input";
import {Point} from "@types_app/general";
import RoomPicker from "@components/Room/RoomPicker/RoomPicker";
import {roomsSelector} from "@store/selectors/selectors";
import {getIconByRoom, RoomIconSize} from "@components/Room/RoomIcon/RoomIcon";
import {RepeatChooser} from "@components/Task/RepeatChooser/RepeatChooser";
import {diffInDays, fmtDate, fmtRelativeRu} from "@utils/date";
import CalendarModal from "@components/Schedule/CalendarModal/CalendarModal";

type Props = {
  task: Task;
  onClose: () => void
};


type PropsRow = React.PropsWithChildren<{
  onClick?: (...args: any[]) => any;
}>;
export const Row: React.FC<PropsRow> = ({children, onClick}) => (
  <div className={styles.row} onClick={onClick}>
    {children}
  </div>
);

export const Combine: React.FC<React.PropsWithChildren> = ({children}) => (
  <section className={styles.combineContainer}>{children}</section>
);

const TaskModal: React.FC<Props> = ({task, onClose}) => {
  const global = useAppSelector(state => state.global);
  const rooms = useAppSelector(roomsSelector);

  const room = React.useMemo(
    () => rooms.find(r => r.title === task.room),
    [rooms, task.room]
  );

  const dispatch = useAppDispatch();

  const [taskDeadline, setTaskDeadline] = React.useState<Date>(new Date());
  const [roomPoint, setRoomPoint] = React.useState<Point | null>(null);
  const [calendarPoint, setCalendarPoint] = React.useState<Point | null>(null);

  const diffDays = React.useMemo(
    () => diffInDays(task.date, new Date()),
    [task.date]
  );

  const isExpired = diffDays >= 1;

  const roomPickerOpenHandler = React.useCallback(
    (e: React.MouseEvent) => setRoomPoint({x: e.clientX, y: e.clientY}),
    []
  );
  const openCalendarModalHandler = React.useCallback(
    (e: React.MouseEvent) => setCalendarPoint({x: e.clientX, y: e.clientY}),
    []
  )

  const closeRoomPicker = () => {
    setRoomPoint(null);
  }

  const closeCalendarModal = () => {
    setCalendarPoint(null);
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
          <Combine>
            <Row>
              <Input text={task.title}/>
            </Row>
            <Row>
              <Textarea text={task.description}/>
            </Row>
          </Combine>

          <Combine>
            <Row onClick={roomPickerOpenHandler}>
              <p>Комната</p>
              <span className={styles.inline}>
                {getIconByRoom(room, RoomIconSize.small)}
                <p className={styles.value}>{task.room}</p>
              </span>
            </Row>

            <Row>
              <p>Повтор</p>
              <RepeatChooser onChange={rule => console.log('Новое правило:', rule)}/>
            </Row>

            <Row>
              <div className={styles.block}>
                <p>Срок</p>
                {isExpired &&
                    <p className={styles.overdue}>Просрочена {diffDays} д</p>
                }
              </div>
              <button className={styles.dueToButton}
                      onClick={openCalendarModalHandler}>{fmtRelativeRu(taskDeadline)}
              </button>
            </Row>

            <Row>
              <p>Напоминание</p>
              <input type="checkbox"/>
            </Row>
          </Combine>

          <Combine>
            <Row>
              <p>Назначить задачу</p>
            </Row>
          </Combine>
        </div>

        <footer className={styles.footer}>
          <button className={styles.ok}>✓ Выполнить</button>
          <button className={styles.skip}>→ Пропустить</button>
        </footer>

        {roomPoint && <RoomPicker position={roomPoint}
                                  task={task}
                                  onClose={closeRoomPicker}/>}
        {calendarPoint && <CalendarModal position={calendarPoint}
                                         monthDate={taskDeadline}
                                         size={ModalSize.fit}
                                         onSelect={(d: Date) => {
                                           setTaskDeadline(d);
                                           closeCalendarModal();
                                         }}
                                         onClose={closeCalendarModal}/>}
      </div>
    </Modal>
  );
}

export default TaskModal;