import React, {useEffect, useMemo, useState} from 'react';
import * as styles from './RepeatPicker.module.css';
import {Wheel} from "@components/UI/Wheel/Wheel";

export enum WeekDays {
  Mon = 'Mon',
  Tue = 'Tue',
  Wed = 'Wed',
  Thu = 'Thu',
  Fri = 'Fri',
  Sat = 'Sat',
  Sun = 'Sun',
}

export enum Units {
  Day = 'Day',
  Week = 'Week',
  Month = 'Month',
  Year = 'Year',
}

export type RepeatRule = {
  count: number;
  unit: Units;
  days: Array<WeekDays>;
};

interface RepeatPickerProps {
  initialRule?: RepeatRule;
  onChange?: (rule: RepeatRule) => void;
}

const NUMBERS = Array.from({length: 30}, (_, i) => i + 1);
const UNITS: Units[] = [Units.Day, Units.Week, Units.Month, Units.Year];
const DAY_LABELS: RepeatRule['days'] = [
  WeekDays.Mon,
  WeekDays.Tue,
  WeekDays.Wed,
  WeekDays.Thu,
  WeekDays.Fri,
  WeekDays.Sat,
  WeekDays.Sun,
];

// Универсальная функция для «окна» из 3 элементов вокруг выбранного
const getWindow = <T, >(arr: T[], sel: T): T[] => {
  const i = arr.indexOf(sel);
  const start = Math.max(0, Math.min(i - 1, arr.length - 3));
  return arr.slice(start, start + 3);
};

// Универсальный обработчик колёсной прокрутки
const handleWheel = <T, >(
    arr: T[],
    sel: T,
    setSel: React.Dispatch<React.SetStateAction<T>>
) => (e: React.WheelEvent) => {
  e.preventDefault();
  const idx = arr.indexOf(sel);
  if (e.deltaY > 0 && idx < arr.length - 1) setSel(arr[idx + 1]);
  if (e.deltaY < 0 && idx > 0) setSel(arr[idx - 1]);
};

const RepeatPicker: React.FC<RepeatPickerProps> = ({
                                                     initialRule,
                                                     onChange,
                                                   }) => {
  const [count, setCount] = useState(initialRule?.count ?? 1);
  const [unit, setUnit] = useState<Units>(initialRule?.unit ?? Units.Week);
  const [days, setDays] = useState<RepeatRule['days']>(initialRule?.days ?? []);

  // При любом изменении поднимаем наверх
  useEffect(() => {
    onChange?.({count, unit, days});
  }, [count, unit, days, onChange]);

  const numsWindow = getWindow(NUMBERS, count);
  const unitsWindow = getWindow(UNITS, unit);

  // Переключение дней недели
  const toggleDay = (d: WeekDays) => {
    if (unit !== Units.Week) return;
    setDays(prev =>
        prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
    );
  };

  // Текст-сводка
  const summary = useMemo(() => {
    const unitText = unit.toLowerCase();
    if (count === 1) return `Каждый ${unitText}`;
    return `Каждые ${count} ${unitText}${unit === Units.Day ? '' : 'а'}`;
  }, [count, unit]);

  return (
      <div className={styles.container}>
        <div className={styles.header}>ПОВТОР</div>
        <div className={styles.wheelsContainer}>
          <div className={styles.summary}>{summary}</div>
          <div className={styles.wheels}>
            <Wheel
              items={Array.from({ length: 30 }, (_, i) => i + 1)}
              selected={count}
              onSelect={setCount}
              windowSize={3}
            />
            <Wheel
              items={[Units.Day, Units.Week, Units.Month, Units.Year]}
              selected={unit}
              onSelect={setUnit}
              windowSize={3}
              renderItem={u => u.toLowerCase()}
            />
          </div>
        </div>
        <div className={styles.infoText}>
          Сроки выполнения задач будут рассчитаны на основе даты завершения
        </div>

        <div className={styles.daysHeader}>В ОПРЕДЕЛЁННЫЕ ДНИ</div>
        <div className={styles.days}>
          {DAY_LABELS.map((day_, index) => {
            const isSelected = days.includes(day_) && unit === Units.Week;
            return (
                <div key={index}
                     className={`${styles.day} ${isSelected ? styles.daySelected : ''} ${unit !== Units.Week ? styles.dayDisabled : ''}`}
                     onClick={() => toggleDay(day_)}>
                  {day_[0]}
                </div>
            );
          })}
        </div>
      </div>
  );
};

export default RepeatPicker;
