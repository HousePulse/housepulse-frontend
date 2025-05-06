import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "@store/store";
import {Task} from "@types_app/task";
import {addMonths, isSameDay, isSameMonth, monthInterval, rangeDays, WEEKDAY_LABELS} from "@utils/date";
import * as styles from './CalendarModal.module.css';
import Modal, {ModalSize} from "@components/UI/Modal/Modal";

type Props = {
  monthDate: Date;
  tasks: Task[];
  onSelect: (d: Date) => void;
  onClose: () => void;
};

const fmtMonth = (d: Date) =>
    d.toLocaleDateString('ru-RU', {month: 'long'});

const CalendarModal: React.FC<Props> = ({monthDate, tasks, onSelect, onClose}) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  const [cursor, setCursor] = useState(monthDate);   // выбранный месяц

  const prevMonth = () => setCursor(addMonths(cursor, -1));
  const nextMonth = () => setCursor(addMonths(cursor, 1));

  const [yearSelect, setYearSelect] = useState(false);
  const years = Array.from({length: 12}, (_, i) => 2018 + i); // 2018‑2029

  const {start, end} = monthInterval(cursor);
  const days = rangeDays(start, end);

  return (
      <Modal onClickBackdrop={onClose}
             size={ModalSize.big}>
        {/* 🔹 Шапка без выбора года */}
        <header className={styles.head}>
          <button className={styles.arrow} onClick={prevMonth}>‹</button>
          <span className={styles.monthLabel}>
          {cursor.toLocaleDateString('ru-RU', {month: 'long', year: 'numeric'})}
        </span>
          <button className={styles.arrow} onClick={nextMonth}>›</button>
        </header>

        {/* сетка дней остаётся как была, но использует `days` */}
        <div className={styles.grid}>
          {WEEKDAY_LABELS.map(l => <span key={l} className={styles.wLabel}>{l}</span>)}

          {days.map(d => {
            const count = tasks.filter(t => isSameDay(t.date, d)).length;
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
      // <div className={styles.backdrop} onClick={onClose}>
      //   <div className={styles.window} onClick={e => e.stopPropagation()}>
      //
      //   </div>
      // </div>
  );
}

export default CalendarModal;