import style from './button.module.scss';

export const Button = ({ children, ...rest }) => (
  <button {...rest} className={style.button}>
    {children}
  </button>
);
