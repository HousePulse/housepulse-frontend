import React, {useState} from 'react';
import * as styles from './TaskList.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import {Task} from "@types_app/task";
import TaskModal from '@components/Schedule/Task/TaskModal/TaskModal';
import sleepImage from '@assets/img/sleep.png';
import {BiSortAlt2} from "react-icons/bi";

type Props = {
  tasks: Task[]
};

const TaskListSortButton: React.FC<{ onClick: () => void }> = ({onClick}) => {
  return (
      <button className={styles.headerButton} onClick={onClick}>
        <p>По сроку выполнения</p>
        <BiSortAlt2/>
      </button>
  )
}

const TaskList: React.FC<Props> = ({tasks}) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  const [openTask, setOpenTask] = useState<Task | null>(null);

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
        <div className={styles.header}>
          <p>{tasks.length} Tasks</p>
          <TaskListSortButton onClick={() => {}}/>
        </div>
        <ul className={styles.list}>
          {tasks.map(t => (
              <li key={t.id} className={styles.item} onClick={() => setOpenTask(t)}>
                <h4>{t.title}</h4>
                <p>{t.description}</p>
                <span className={styles.room}>{t.room}</span>
              </li>
          ))}
        </ul>
        {openTask && <TaskModal task={openTask} onClose={() => setOpenTask(null)}/>}
      </div>
  );
};

export default TaskList;