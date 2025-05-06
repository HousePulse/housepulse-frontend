import React, {FC} from 'react';
import * as style from './RoomIcon.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";

export enum IconBackgroundColor {
  Red = '#fd7053',
  Orange = '#f79f4d',
  Yellow = '#f9ba1e',
  Green = '#81c43e',
  Blue = '#458cea',
  Purple = '#9b7de4',
  Cyan = '#46ccde',
}

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