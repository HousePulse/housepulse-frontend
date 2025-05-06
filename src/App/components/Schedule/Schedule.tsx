import React, {FC, useState} from 'react';
import * as styles from './Schedule.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";

import {addDays, fmtRelativeRu, isSameDay, rangeDays, startOfWeek,} from '@utils/date';
import WeekDay from "@components/Schedule/WeekDay/WeekDay";
import CalendarModal from "@components/Schedule/CalendarModal/CalendarModal";
import TaskList from "@components/Schedule/Task/TaskList/TaskList";
import {IoIosArrowDown,} from "react-icons/io";
import Header from "@components/Header/Header";

const today = new Date();

const weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

const Schedule: FC = (props) => {
  const tasks = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(0);

  const weekStart = startOfWeek(selectedDate);
  const week = rangeDays(weekStart, addDays(weekStart, 6));

  const dayTasks = tasks.mockTasks.filter(t => isSameDay(t.date, selectedDate));

  return (
      <div className={styles.container}>
        <header className={styles.header}>
          <Header/>
          <div className={styles.headerText}>
            <h2 className={styles.title}>График</h2>

            <button className={styles.dateBtn} onClick={() => setCalendarOpen(true)}>
              {fmtRelativeRu(selectedDate, today)}
              <IoIosArrowDown className={styles.dateBtnIcon}/>
            </button>
          </div>
        </header>

        <ul className={styles.weekRow}>
          {week.map(d => (
              <WeekDay
                  key={d.toISOString()}
                  date={d}
                  selected={isSameDay(d, selectedDate)}
                  onClick={() => setSelectedDate(d)}
                  hasTask={tasks.mockTasks.some(t => isSameDay(t.date, d))}
              />
          ))}
        </ul>

        <TaskList tasks={dayTasks}/>

        {calendarOpen && (
            <CalendarModal
                tasks={tasks.mockTasks}
                monthDate={selectedDate}
                onSelect={d => {
                  setSelectedDate(d);
                  setCalendarOpen(false);
                }}
                onClose={() => setCalendarOpen(false)}
            />
        )}
      </div>
  );
}

export default Schedule;