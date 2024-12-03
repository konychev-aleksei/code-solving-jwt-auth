import { useForm } from 'react-hook-form';
import cn from 'classnames';
import styles from './style.module.scss';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInSchema } from './validtionSchemas';
import { Field, Button } from '../ui';

const defaultValues = {
  userName: '',
  password: '',
};

export default function SignIn() {
  const { handleSignIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(signInSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(handleSignIn)}
      className={cn(styles.wrapper, styles.wrapper__startup)}
    >
      <h2>Войти в аккаунт</h2>
      <Field
        name="userName"
        register={register}
        autoComplete="off"
        placeholder="Имя пользователя"
        error={Boolean(errors.userName)}
        helperText={errors.userName?.message}
      />
      <Field
        name="password"
        register={register}
        autoComplete="off"
        placeholder="Пароль"
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
      />
      <Button disabled={isSubmitting} type="submit">
        Войти
      </Button>
    </form>
  );
}
