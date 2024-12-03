import { useContext } from 'react';
import styles from './style.module.scss';
import { AuthContext } from '../context/AuthContext';
import { TestList } from '../components/TestList/TestList';
import { Button } from '../ui';

const roles = {
  1: 'Модератор',
  2: 'Пользователь',
};

export default function Demo() {
  const {
    user: { userId, userName, role },
    handleLogOut,
  } = useContext(AuthContext);

  return (
    <div className={styles.app}>
      <div className={styles.app__header}>
        <Button onClick={handleLogOut}>Выйти</Button>
        <p>Ваш id: {userId}</p>
        <p>Ваше имя: {userName}</p>
        <p>Ваша роль: {roles[role]}</p>
      </div>
      <TestList />
    </div>
  );
}
