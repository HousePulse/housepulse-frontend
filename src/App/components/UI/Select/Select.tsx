import React, {useEffect, useRef, useState} from 'react';
import * as styles from './Select.module.css';
import {BsArrowsVertical} from "react-icons/bs";
import Modal, {ModalSize} from "@components/UI/Modal/Modal";
import {Point} from "@types_app/general";

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  selectedValue: string;
  onChange: (e: React.MouseEvent, value: string) => void;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = (
    {
      options,
      selectedValue,
      onChange,
      placeholder = 'Выберите…',
    }) => {
  const [open, setOpen] = useState(false);
  const [point, setPoint] = React.useState<Point | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOpen = (e: React.MouseEvent) => {
    setOpen(!open);
    const point_: Point = {
      x: e.clientX,
      y: e.clientY
    }

    setPoint(point_);
  }

  const selectedOption = options.find(o => o.value === selectedValue);

  return (
      <div className={styles.select}
           ref={ref}>
        <button type="button"
                className={styles.toggleButton}
                onClick={handleOpen}>
          {selectedOption?.label ?? placeholder}
          <BsArrowsVertical/>
        </button>

        {open && point && (
            <Modal onClose={() => setOpen(false)}
                   size={ModalSize.fit}
                   position={point}>
              <ul className={styles.dropdown}>
                {options.map(opt => (
                    <li key={opt.value}
                        className={`${styles.option} ${
                            opt.value === selectedValue ? styles.optionSelected : ''
                        }`}
                        onClick={(e) => {
                          onChange(e, opt.value);
                          setOpen(false);
                        }}>
                      {opt.label}
                      {opt.value === selectedValue && (
                          <span className={styles.checkmark}>✓</span>
                      )}
                    </li>
                ))}
              </ul>
            </Modal>
        )}
      </div>
  );
};

export default Select;
