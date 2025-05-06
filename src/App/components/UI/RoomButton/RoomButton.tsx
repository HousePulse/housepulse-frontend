import React from 'react';
import * as styles from './RoomButton.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import {FaShower} from "react-icons/fa";
import {FiHome, FiTv} from "react-icons/fi";
import {RoomIcon} from "@types_app/room";

type Props = {
  name: string;
  icon: RoomIcon;
  tasks?: number;
};

const iconMap = {
  shower: FaShower,
  home: FiHome,
  tv: FiTv,
};


const RoomButton: React.FC<Props> = ({name, icon, tasks = 0}) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  const Icon = iconMap[icon];

  return (
      <div className={styles.item}>
        <div className={styles.icon}><Icon/></div>
        <span>{name}</span>
        <span className={styles.muted}>{tasks ? tasks : 'нет задач'}</span>
      </div>
  );
}

export default RoomButton;