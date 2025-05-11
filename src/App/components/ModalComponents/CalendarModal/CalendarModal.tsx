import React, {useCallback, useState} from 'react';
import {Task} from "@types_app/task";
import {addMonths, isSameDay, isSameMonth, monthInterval, rangeDays, WEEKDAY_LABELS} from "@utils/date";
import * as styles from './CalendarModal.module.css';
import Modal, {ModalSize} from "@components/UI/Modal/Modal";
import {Point} from "@types_app/general";

type Props = {
  monthDate: Date;
  tasks?: Task[];
  onSelect: (d: Date) => void;
  onClose: (...args: any[]) => void;
  position?: Point,
  size?: ModalSize
};

// TODO: запретить выбор старых дат и месяцев
const CalendarModal: React.FC<Props> = ({monthDate, tasks, onSelect, onClose, position, size}) => {
  const [cursor, setCursor] = useState(monthDate);

  const prevMonth = useCallback(() => setCursor(addMonths(cursor, -1)), [cursor]);
  const nextMonth = useCallback(() => setCursor(addMonths(cursor, 1)), [cursor]);

  const {start, end} = monthInterval(cursor);
  const days = rangeDays(start, end);

  return (
    <Modal onClose={onClose}
           size={size || ModalSize.big}
           position={position}>
      <header className={styles.head}>
        <button className={styles.arrow} onClick={prevMonth}>‹</button>
        <span className={styles.monthLabel}>
          {cursor.toLocaleDateString('ru-RU', {month: 'long', year: 'numeric'})}
        </span>
        <button className={styles.arrow} onClick={nextMonth}>›</button>
      </header>

      <div className={styles.grid}>
        {WEEKDAY_LABELS.map(l => <span key={l} className={styles.wLabel}>{l}</span>)}

        {days.map(d => {
          const count = tasks ? tasks.filter(t => isSameDay(t.date, d)).length : null;
          return (
            <button
              key={d.toISOString()}
              className={`${styles.cell} ${isSameMonth(d, cursor) ? '' : styles.outMonth}`}
              onClick={() => onSelect(d)}
            >
              {d.getDate()}
              {!!count && <span className={styles.tag}>{count}</span>}
            </button>
          );
        })}
      </div>
    </Modal>
  );
}

export default CalendarModal;