import React, {FC} from 'react';
import * as styles from './Fab.module.css'
import {FiPlus} from "react-icons/fi";

type Props = { onClick: () => void };

const Fab: React.FC<Props> = ({ onClick }) => (
    <button className={styles.fab} onClick={onClick}>
      <FiPlus />
    </button>
);

export default Fab;