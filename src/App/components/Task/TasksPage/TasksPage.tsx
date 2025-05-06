import React, {FC} from 'react';
import * as style from './TasksPage.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import TaskList from "@components/Task/TaskList/TaskList";
import {tasksSelector} from "@store/selectors/selectors";

const TasksPage: FC = (props) => {
  const tasks = useAppSelector(tasksSelector);
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  return (
      <div className={style.container}>
        <h1>Все задачи</h1>
        <TaskList tasks={tasks.filter(t => !t.done)}
                  isShownHeaderInfo={false}/>
      </div>
  );
}

export default TasksPage;