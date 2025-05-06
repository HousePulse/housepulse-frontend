import React, {FC} from 'react';
import * as style from './RoomIcon.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import {IconBackgroundColor} from "@types_app/room";

type PropsType = {
  icon: React.ReactNode,
  backgroundColor: IconBackgroundColor
  className?: string,
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