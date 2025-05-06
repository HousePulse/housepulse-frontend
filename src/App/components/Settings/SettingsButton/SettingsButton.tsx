import React from 'react';
import * as styles from './SettingsButton.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import { IoIosSettings } from "react-icons/io";

type Props = { onClick: () => void };

const SettingsButton: React.FC<Props> = ({onClick}) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  return (
      <button className={styles.btn} onClick={onClick} title="Настройки">
        <IoIosSettings/>
      </button>
  );
}

export default SettingsButton;