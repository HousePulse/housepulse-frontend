import React, {useEffect, useRef, useState} from 'react';
import * as styles from './Select.module.css';
import {BsArrowsVertical} from "react-icons/bs";
import Modal, {ModalSize} from "@components/UI/Modal/Modal";
import {Point} from "@types_app/general";
import {useContextPoint} from "@utils/hooks";

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
  const [pointOptions, openOptions, closeOptions] = useContextPoint();
  const selectedOption = options.find(o => o.value === selectedValue);

  return (
    <div className={styles.select}>
      <button type="button"
              className={styles.toggleButton}
              onClick={openOptions}>
        {selectedOption?.label ?? placeholder}
        <BsArrowsVertical/>
      </button>

      {pointOptions && (
        <Modal onClose={closeOptions}
               size={ModalSize.fit}
               position={pointOptions}>
          <ul className={styles.dropdown}>
            {options.map(opt => (
              <li key={opt.value}
                  className={`${styles.option} ${
                    opt.value === selectedValue ? styles.optionSelected : ''
                  }`}
                  onClick={(e) => {
                    onChange(e, opt.value);
                    closeOptions();
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
