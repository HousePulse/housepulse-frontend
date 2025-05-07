import React, {useEffect, useState} from 'react';
import Select from '@components/UI/Select/Select';
import RepeatPicker, {RepeatRule, Units} from '@components/Task/RepeatPicker/RepeatPicker';
import * as styles from './RepeatChooser.module.css';
import {Point} from "@types_app/general";
import Modal, {ModalSize} from "@components/UI/Modal/Modal";

type Preset =
    | 'never'
    | 'daily'
    | 'weekly'
    | 'biweekly'
    | 'monthly'
    | 'quarterly'
    | 'semiannual'
    | 'custom';

const PRESETS: Array<{ value: Preset; label: string }> = [
  {value: 'never', label: 'Никогда'},
  {value: 'daily', label: 'Ежедневно'},
  {value: 'weekly', label: 'Каждую неделю'},
  {value: 'biweekly', label: 'Каждые 2 недели'},
  {value: 'monthly', label: 'Каждый месяц'},
  {value: 'quarterly', label: 'Каждые 3 месяца'},
  {value: 'semiannual', label: 'Каждые 6 месяцев'},
  {value: 'custom', label: 'Настроить график'},
];

interface RepeatChooserProps {
  /**
   * initialPreset — один из PRESETS.value,
   * initialCustomRule — если нужен свой RepeatRule при custom
   */
  initialPreset?: Preset;
  initialCustomRule?: RepeatRule;
  /**
   * Вызывается при любом изменении:
   * - null, если выбрано «Никогда»
   * - {count, unit, days} — для остальных
   */
  onChange?: (rule: RepeatRule | null) => void;
}

export const RepeatChooser: React.FC<RepeatChooserProps> = ({
                                                              initialPreset = 'weekly',
                                                              initialCustomRule,
                                                              onChange,
                                                            }) => {
  const [preset, setPreset] = useState<Preset>(initialPreset);
  const [point, setPoint] = React.useState<Point | null>(null);

  const [customRule, setCustomRule] = useState<RepeatRule>(
      initialCustomRule ?? {count: 1, unit: Units.Week, days: []}
  );

  // При смене preset или customRule — отдаем наверх
  useEffect(() => {
    if (preset === 'custom') {
      onChange?.(customRule);
      return;
    }

    if (preset === 'never') {
      onChange?.(null);
      return;
    }

    // готовые правила для пресетов
    const mapping: Record<Exclude<Preset, 'custom'>, RepeatRule | null> = {
      never: null,
      daily: {count: 1, unit: Units.Day, days: []},
      weekly: {count: 1, unit: Units.Week, days: []},
      biweekly: {count: 2, unit: Units.Week, days: []},
      monthly: {count: 1, unit: Units.Month, days: []},
      quarterly: {count: 3, unit: Units.Month, days: []},
      semiannual: {count: 6, unit: Units.Month, days: []},
    };

    onChange?.(mapping[preset]);
  }, [preset, customRule]);

  const handleOpen = (e: React.MouseEvent) => {
    const point_: Point = {
      x: e.clientX,
      y: e.clientY
    }

    setPoint(point_);
  }

  return (
      <div className={styles.container}>
        <Select
            options={PRESETS}
            selectedValue={preset}
            onChange={(e, value) => {
              setPoint({
                x: e.clientX,
                y: e.clientY
              });

              setPreset(value as Preset);
            }}
            placeholder="Повтор"
        />

        {preset === 'custom' && point && (
            <Modal onClose={() => setPoint(null)}
                   size={ModalSize.fit}
                   position={point}>
              <div className={styles.pickerContainer}>
                <RepeatPicker
                    initialRule={customRule}
                    onChange={r => setCustomRule(r)}
                />
              </div>
            </Modal>

        )}
      </div>
  );
};
