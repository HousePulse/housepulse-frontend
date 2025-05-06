import React from 'react';
import * as styles from './TaskModal.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import {Task} from "@types_app/task";
import {FiChevronLeft, FiMoreVertical} from "react-icons/fi";
import Modal from "@components/UI/Modal/Modal";

const Row: React.FC<{ label: string; value?: string; rightIcon?: React.ReactNode; children?: React.ReactNode }> =
    ({label, value, rightIcon, children}) => (
        <div className={styles.row}>
          <span>{label}</span>
          {value && <span className={styles.value}>{value}</span>}
          {children}
          {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
        </div>
    );

type Props = {
  task: Task | null;
  onClose: () => void,
  isOpen: boolean
};

const TaskModal: React.FC<Props> = ({task, onClose, isOpen}) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  if (!task) {
    return null;
  }

  return (
      <Modal onClose={onClose}
             isOpen={isOpen}>
        <header className={styles.head}>
          <button className={styles.back} onClick={onClose}><FiChevronLeft/> Назад</button>
          <span className={styles.title}>Детали задачи</span>
          <FiMoreVertical className={styles.menu}/>
        </header>

        <input className={styles.inputTitle} defaultValue={task.title}/>
        <textarea className={styles.inputDesc} rows={2} defaultValue={task.description || ''}/>

        <div className={styles.params}>
          <Row label="Комната" value={task.room}/>
          <Row label="Повтор" value="Каждые 2 недели" rightIcon="▼"/>
          <Row label="Срок">
            <button className={styles.dueBtn}>пн, 5 мая</button>
            <span className={styles.overdue}>Просрочена 1 д</span>
          </Row>
          <Row label="Напоминание">
            <input type="checkbox"/>
          </Row>
        </div>

        <button className={styles.locked}>Назначить задачу 🔒</button>

        <footer className={styles.footer}>
          <button className={styles.ok}>✓ Выполнить</button>
          <button className={styles.skip}>→ Пропустить</button>
        </footer>
      </Modal>
  );
}

export default TaskModal;