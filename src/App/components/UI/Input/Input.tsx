import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "@store/store";
import * as styles from "@components/Task/TaskModal/TaskModal.module.css";

type Props = {
  text: string
}

const Input: FC<Props> = ({text}) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  return (
      <input className={styles.inputTitle}
             defaultValue={text}/>
  );
}

export default Input;