import React, {useState} from 'react';
import * as styles from './TaskList.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import {Task} from "@types_app/task";
import TaskModal from '@components/Task/TaskModal/TaskModal';
import sleepImage from '@assets/img/sleep.png';
import {BiSortAlt2} from "react-icons/bi";
import {diffInDays} from "@utils/date";
import {RxCountdownTimer} from "react-icons/rx";
import Button from "@components/UI/Button/Button";

type Props = {
  tasks: Task[],
  isShownHeaderInfo: boolean
};

const TaskListSortButton: React.FC<{ onClick: () => void }> = ({onClick}) => {
  return (
      <button className={styles.headerButton} onClick={onClick}>
        <p>По сроку выполнения</p>
        <BiSortAlt2/>
      </button>
  )
}

const TaskList: React.FC<Props> = ({tasks, isShownHeaderInfo}) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  const [openTaskId, setOpenTaskId] = useState<number | null>(null);
  const openTask = tasks.find(t => t.id === openTaskId) ?? null;

  const handleOpen = (id: number) => setOpenTaskId(id);
  const handleClose = () => setOpenTaskId(null);

  console.log(openTask)

  if (!tasks.length)
    return (
        <div className={styles.empty}>
          <img className={styles.emptyImage} src={sleepImage} alt=""/>
          <p className={styles.big}>Задач на этот день нет</p>
          <p className={styles.small}>Создайте задачу, нажав на кнопку “+”</p>
        </div>
    );

  return (
      <div className={styles.taskListContainer}>
        {isShownHeaderInfo && <div className={styles.header}>
            <p>{tasks.length} Tasks</p>
            <TaskListSortButton onClick={() => {
            }}/>
        </div>}
        <div className={styles.list}>
          {tasks.map((t, index) => {
            const diffDays = diffInDays(t.date, new Date());
            const isExpired = diffDays >= 1;

            return (
                <Button key={index}
                        className={styles.item}
                        onClick={() => handleOpen(t.id)}>
                  <h4>{t.title}</h4>
                  <p>{t.description}</p>
                  {isExpired && <div className={styles.expired}>
                      <RxCountdownTimer/>
                      <p>Просрочена {diffDays} д</p>
                  </div>}
                  <span className={styles.room}>{t.room}</span>
                </Button>
            )
          })}
        </div>
        {!!openTask && <TaskModal task={openTask}
                                  onClose={handleClose}/>}
      </div>
  );
};

export default TaskList;