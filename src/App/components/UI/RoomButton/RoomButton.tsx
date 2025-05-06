import React from 'react';
import * as styles from './RoomButton.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";

type Props = {
  name: string;
  icon: React.ReactNode;
  tasks?: number;
};

const RoomButton: React.FC<Props> = ({name, icon, tasks = 0}) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  return (
      <div className={styles.item}>
        <div className={styles.icon}>{icon}</div>
        <span>{name}</span>
        <span className={styles.muted}>{tasks ? tasks : 'нет задач'}</span>
      </div>
  );
}

export default RoomButton;