import React from 'react';
import * as styles from './TaskModal.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import {Task} from "@types_app/task";
import {FiChevronLeft, FiMoreVertical} from "react-icons/fi";
import Modal, {ModalSize} from "@components/UI/Modal/Modal";
import Textarea from "@components/UI/Textarea/Textarea";
import Input from "@components/UI/Input/Input";
import RoomPickerModal from "@components/ModalComponents/RoomPickerModal/RoomPickerModal";
import {roomsSelector} from "@store/selectors/selectors";
import {getIconByRoom, RoomIconSize} from "@components/Room/RoomIcon/RoomIcon";
import {RepeatChooser} from "@components/Task/RepeatChooser/RepeatChooser";
import {diffInDays, fmtRelativeRu} from "@utils/date";
import CalendarModal from "@components/ModalComponents/CalendarModal/CalendarModal";
import {useContextPoint} from "@utils/hooks";

type Props = {
  task: Task;
  onClose: () => void
};

const ChevronLeft = React.memo(FiChevronLeft);

// TODO: сделать draftTask и избавиться от taskDeadline (заменить draftTask)
const TaskModal: React.FC<Props> = ({task, onClose}) => {
  const rooms = useAppSelector(roomsSelector);
  const room = React.useMemo(
    () => rooms.find(r => r.title === task.room),
    [rooms, task.room]
  );

  const dispatch = useAppDispatch();

  const [taskDeadline, setTaskDeadline] = React.useState<Date>(task.date);
  const [roomPoint, openRoom, closeRoom] = useContextPoint();
  const [calendarPoint, openCalendar, closeCalendar] = useContextPoint();

  const diffDays = React.useMemo(
    () => diffInDays(task.date, new Date()),
    [task.date]
  );

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <header className={styles.head}>
          <button className={styles.back} onClick={onClose}><ChevronLeft/> Назад</button>
          <span className={styles.title}>Детали задачи</span>
          <FiMoreVertical className={styles.menu}/>
        </header>

        <div className={styles.paramsContainer}>
          <section className={styles.combineContainer}>
            <div className={styles.row}>
              <Input value={task.title}
                     onChange={(text: string) => {
                     }}/>
            </div>
            <div className={styles.row}>
              <Textarea value={task.description}
                        onChange={(text: string) => {
                        }}/>
            </div>
          </section>

          <section className={styles.combineContainer}>
            <div className={styles.row}>
              <p>Комната</p>
              <button className={styles.roomButton} onClick={openRoom}>
                {getIconByRoom(room, RoomIconSize.small)}
                <p className={styles.value}>{task.room}</p>
              </button>
            </div>

            <div className={styles.row}>
              <p>Повтор</p>
              <RepeatChooser onChange={rule => console.log('Новое правило:', rule)}/>
            </div>

            <div className={styles.row}>
              <div className={styles.block}>
                <p>Срок</p>
                {diffDays >= 1 &&
                    <p className={styles.overdue}>Просрочена {diffDays} д</p>
                }
              </div>
              <button className={styles.deadlineButton}
                      onClick={openCalendar}>{fmtRelativeRu(taskDeadline)}
              </button>
            </div>

            <div className={styles.row}>
              <p>Напоминание</p>
              <input type="checkbox"/>
            </div>
          </section>

          <section className={styles.combineContainer}>
            <div className={styles.row}>
              <p>Назначить задачу</p>
            </div>
          </section>
        </div>

        <footer className={styles.footer}>
          <button className={styles.ok}>✓ Выполнить</button>
          <button className={styles.skip}>→ Пропустить</button>
        </footer>

        {roomPoint && <RoomPickerModal position={roomPoint}
                                       task={task}
                                       onClose={closeRoom}/>}
        {calendarPoint && <CalendarModal position={calendarPoint}
                                         monthDate={taskDeadline}
                                         size={ModalSize.fit}
                                         onSelect={(d: Date) => {
                                           setTaskDeadline(d);
                                           closeCalendar();
                                         }}
                                         onClose={closeCalendar}/>}
      </div>
    </Modal>
  );
}

export default TaskModal;