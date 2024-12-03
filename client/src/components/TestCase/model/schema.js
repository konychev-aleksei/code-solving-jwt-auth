import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  n: Yup.number()
    .required('Поле обязательно')
    .typeError('Значение должно быть числом')
    .min(0, 'Минимальное значение - 0')
    .max(1000, 'Максимальное значение - 1000'),
  expectedResult: Yup.number()
    .required('Поле обязательно')
    .typeError('Значение должно быть числом')
});
