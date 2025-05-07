import React, {FC} from 'react';
import * as style from './RoomIcon.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import {IconBackgroundColor, Room} from "@types_app/room";
import {FaShower} from "react-icons/fa";
import {FiHome, FiTv} from "react-icons/fi";

type PropsType = {
  icon: React.ReactNode,
  backgroundColor: IconBackgroundColor
  className?: string,
}
const iconMap = {
  shower: FaShower,
  home: FiHome,
  tv: FiTv,
};

export enum RoomIconSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export function getIconByRoom(room?: Room, size: RoomIconSize = RoomIconSize.medium): React.ReactNode | null {
  if (room && iconMap[room.icon]) {
    const Icon = iconMap[room.icon];
    return <RoomIcon icon={<Icon/>}
                     backgroundColor={room.backgroundColor}
                     className={style[size]}/>
  }
  return null;
}

const RoomIcon: FC<PropsType> = ({icon, backgroundColor, className}) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  return (
      <div className={`${style.icon} ${className}`} style={{backgroundColor: backgroundColor}}>
        {icon}
      </div>
  );
}

export default RoomIcon;