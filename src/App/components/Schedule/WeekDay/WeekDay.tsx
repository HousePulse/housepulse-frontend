import React from 'react';
import * as styles from './WeekDay.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import {isToday, WEEKDAY_LABELS} from "@utils/date";

type Props = {
  date: Date;
  selected: boolean;
  onClick: () => void;
  hasTask?: boolean;
};

const WeekDay: React.FC<Props> = ({date, selected, onClick, hasTask}) => {
  const [isOld, setIsOld] = React.useState(new Date().getDate() > date.getDate());
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  const weekday = WEEKDAY_LABELS[(date.getDay() + 6) % 7]; // Делать ПН=0

  return (
      <li
          className={`${styles.day} ${isOld ? styles.old : ''} ${isToday(date) ? styles.today : ''} ${selected ? styles.selected : ''}`}
          title={date.toLocaleDateString('ru-RU', {weekday: 'long', day: 'numeric', month: 'long'})}
          onClick={() => {
            if (isOld) {
              return;
            }
            onClick()
          }}
      >
        <span className={styles.label}>{weekday}</span>
        <span className={styles.num}>{date.getDate()}</span>
      </li>
  );
}

export default WeekDay;