import React from 'react';
import * as styles from './SettingsModal.module.css';
import {FiHome, FiLogIn, FiPlus, FiX} from 'react-icons/fi';
import {useAppDispatch, useAppSelector} from "@store/store";
import Modal from "@components/UI/Modal/Modal";

type Props = {
  onClose: () => void,
  isOpen: boolean
};

const SettingsModal: React.FC<Props> = ({onClose, isOpen}) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  return (
      <Modal onClose={onClose}
             isOpen={isOpen}>
        <header className={styles.head}>
          <h3>Настройки</h3>
          <button onClick={onClose} className={styles.done}>Готово</button>
        </header>

        {/* Профиль */}
        <section className={styles.profile}>
          <div className={styles.avatar}>I</div>
          <div>
            <div className={styles.name}>Isupov Grigoriy</div>
            <div className={styles.email}>isupov.grigoriy@mail.ru</div>
          </div>
          <FiX className={styles.chevron}/>
        </section>

        {/* Баннер премиум */}
        <section className={styles.banner}>
          <span>Разблокируйте премиум функции</span>
          <small>Начните бесплатную версию или получите пожизненный доступ</small>
        </section>

        {/* Список домов */}
        <section className={styles.homes}>
          <div className={styles.caption}>1 дом</div>

          <button className={styles.homeItem}>
            <FiHome/>
            <div className={styles.homeText}>
              <span>Дом</span>
              <small>1 чел.</small>
            </div>
          </button>

          <button className={`${styles.homeItem} ${styles.locked}`}>
            <FiPlus/>
            <span>Добавить новый дом</span>
          </button>

          <button className={`${styles.homeItem} ${styles.locked}`}>
            <FiLogIn/>
            <span>Войти в другой дом</span>
          </button>
        </section>

        {/* Курортный режим */}
        <button className={`${styles.vacation} ${styles.locked}`}>
          Режим отпуска
        </button>
      </Modal>
  );
}

export default SettingsModal;