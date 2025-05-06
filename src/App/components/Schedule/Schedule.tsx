import React, {FC, useState} from 'react';
import * as styles from './Schedule.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";

import {addDays, diffInDays, fmtRelativeRu, isSameDay, rangeDays, startOfWeek,} from '@utils/date';
import CalendarModal from "@components/Schedule/CalendarModal/CalendarModal";
import TaskList from "@components/Task/TaskList/TaskList";
import {IoIosArrowDown,} from "react-icons/io";
import Header from "@components/Header/Header";
import {tasksSelector} from "@store/selectors/selectors";
import {Task} from "@types_app/task";
import WeekRow from "@components/Schedule/WeekRow/WeekRow";
import {setSelectedDate} from "@store/globalSlice";
import Fab from "@components/UI/Fab/Fab";

const today = new Date();

const weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

const Schedule: FC = (props) => {
  const global = useAppSelector(state => state.global);
  const tasks: Task[] = useAppSelector(tasksSelector);
  const dispatch = useAppDispatch();

  const today = new Date();
  const selectedDate = global.selectedDate;
  const [calendarOpen, setCalendarOpen] = useState(false);

  const weekStart = startOfWeek(selectedDate);
  const week = rangeDays(weekStart, addDays(weekStart, 6));

  const dayTasks = tasks.filter(t => isSameDay(t.date, selectedDate) || diffInDays(t.date, today) >= 1 && isSameDay(today, selectedDate));

  return (
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerText}>
            <h2 className={styles.title}>График</h2>

            <button className={styles.dateBtn} onClick={() => setCalendarOpen(true)}>
              {fmtRelativeRu(selectedDate, today)}
              <IoIosArrowDown className={styles.dateBtnIcon}/>
            </button>
          </div>
        </header>

        <WeekRow week={week}/>

        <div className={styles.tasksList}>
          <TaskList tasks={dayTasks}
                    isShownHeaderInfo={true}/>
        </div>

        <CalendarModal
            tasks={tasks}
            monthDate={selectedDate}
            onSelect={d => {
              dispatch(setSelectedDate(d));
              setCalendarOpen(false);
            }}
            onClose={() => setCalendarOpen(false)}
            isOpen={calendarOpen}
        />
        <Fab onClick={() => {/* TODO: open new‑task modal */
        }}/>
      </div>
  );
}

export default Schedule;