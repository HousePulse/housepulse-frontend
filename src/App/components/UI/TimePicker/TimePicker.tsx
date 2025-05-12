import React from 'react';
import {Wheel} from '@components/UI/Wheel/Wheel';
import * as styles from './TimePicker.module.css'

interface TimePickerProps {
  hour: number;
  minute: number;
  onChange: (h: number, m: number) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({hour, minute, onChange}) => {
  const hours = Array.from({length: 24}, (_, i) => i);
  const minutes = Array.from({length: 60}, (_, i) => i);

  return (
    <div className={styles.timePicker}>
      <Wheel
        className={styles.wheel}
        items={hours}
        selected={hour}
        onSelect={h => onChange(h, minute)}
        renderItem={h => String(h).padStart(2, '0')}
      />
      <Wheel
        className={styles.wheel}
        items={minutes}
        selected={minute}
        onSelect={m => onChange(hour, m)}
        renderItem={m => String(m).padStart(2, '0')}
      />
    </div>
  );
};

export default TimePicker;