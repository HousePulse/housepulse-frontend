import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "@store/store";
import * as styles from "./Input.module.css";

type Props = {
  value: string,
  onChange: (text: string) => void,
}

const Input: FC<Props> = ({value, onChange}) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  return (
    <input className={styles.input}
           defaultValue={value}
           onChange={(e) => {
             onChange(e.target.value)
           }}/>
  );
}

export default Input;