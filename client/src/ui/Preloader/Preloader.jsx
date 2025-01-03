import { Circle } from 'react-preloaders';
import styles from './Preloader.module.scss';

export const Preloader = () => {
  return (
    <div className={styles.centered}>
      <Circle />
    </div>
  );
};
