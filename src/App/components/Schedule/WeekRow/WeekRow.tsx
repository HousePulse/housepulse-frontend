import React, {FC, memo} from 'react';
import {useAppDispatch, useAppSelector} from "@store/store";
import * as styles from "./WeekRow.module.css";
import {isSameDay, isToday, WEEKDAY_LABELS} from "@utils/date";
import {setSelectedDate} from "@store/globalSlice";


type WeekRowProps = {
  week: Date[],
}


const WeekRow: FC<WeekRowProps> = memo(({week}) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  const setSelectedDateHandler = (d: Date) => {
    dispatch(setSelectedDate(d))
  }

  return (
      <ul className={styles.weekRow}>
        {week.map((day, index) => {
          const weekday = WEEKDAY_LABELS[(day.getDay() + 6) % 7];
          const isOld = new Date().getDate() > day.getDate();
          const selectedDay = isSameDay(day, global.selectedDate);

          return (
              <li key={index}
                  className={`
                      ${styles.day} ${isOld ? styles.old : ''} 
                      ${isToday(day) ? styles.today : ''} 
                      ${selectedDay ? styles.selected : ''}
                  `}
                  title={day.toLocaleDateString('ru-RU', {weekday: 'long', day: 'numeric', month: 'long'})}
                  onClick={() => {
                    if (!isOld) {
                      setSelectedDateHandler(day);
                    }
                  }}>
                <span className={styles.label}>{weekday}</span>
                <span className={styles.num}>{day.getDate()}</span>
              </li>
          )
        })}
      </ul>
  );
});

export default WeekRow;