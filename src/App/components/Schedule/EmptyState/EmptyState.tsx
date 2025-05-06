import React, {FC} from 'react';
import * as styles from './EmptyState.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import {FiMoon} from "react-icons/fi";

const EmptyState: FC = (props) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  return (
      <div className={styles.wrapper}>
        <FiMoon className={styles.icon}/>
        <p className={styles.textBig}>Задач на сегодня нет</p>
        <p className={styles.textSmall}>Создайте задачу нажав на кнопку “+”</p>
      </div>
  );
}

export default EmptyState;