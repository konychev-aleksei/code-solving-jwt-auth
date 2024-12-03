import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Field, Button } from '../../../ui';
import { validationSchema } from '../model/schema';
import styles from './TestCase.module.scss';
import { AuthContext, ResourceClient } from '../../../context/AuthContext';
import showErrorMessage from '../../../utils/showErrorMessage';

export const TestCase = ({
  num,
  onDelete,
  id,
  n,
  expectedResult,
  factResult,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      n,
      expectedResult,
      factResult,
    },
    resolver: yupResolver(validationSchema),
  });

  const solveTestCase = (values) => {
    ResourceClient.post(`/task/submit?testId=${id}`, { ...values })
      .then(({ data }) => {
        setValue('factResult', data);
        alert(data === values.expectedResult ? 'success' : 'failed');
      })
      .catch(showErrorMessage);
  };

  const updateTestCase = (values) => {
    ResourceClient.put(`/test-case/update?testId=${id}`, { ...values }).catch(
      showErrorMessage
    );
  };

  return (
    <form className={styles.form}>
      <h2>Тесткейс {num + 1}</h2>
      <Button
        onClick={(event) => {
          event.preventDefault();
          onDelete(id);
        }}
      >
        Удалить
      </Button>
      <p>Значение N</p>
      <Field
        register={register}
        name="n"
        autoComplete="off"
        placeholder="Введите значение N"
        error={Boolean(errors.n)}
        helperText={errors.n?.message}
      />
      <p>Ожидаемый результат</p>
      <Field
        register={register}
        name="expectedResult"
        autoComplete="off"
        placeholder="Введите ожидаемый результат"
        error={Boolean(errors.expectedResult)}
        helperText={errors.expectedResult?.message}
      />
      <Button
        onClick={(event) => {
          event.preventDefault();
          handleSubmit((data) => solveTestCase(data))();
        }}
      >
        Решить
      </Button>
      <Field
        register={register}
        name="factResult"
        autoComplete="off"
        placeholder="Фактический результат"
        disabled
      />
      <Button
        onClick={(event) => {
          event.preventDefault();
          handleSubmit((data) => updateTestCase(data))();
        }}
      >
        Сохранить
      </Button>
    </form>
  );
};
