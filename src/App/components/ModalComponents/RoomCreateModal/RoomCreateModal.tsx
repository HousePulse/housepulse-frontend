import React, {FC} from 'react';
import * as style from './RoomCreateModal.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";

const RoomCreateModal: FC = (props) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  return (
      <div className={style.block}>
        <h1>{123}</h1>
      </div>
  );
}

export default RoomCreateModal;