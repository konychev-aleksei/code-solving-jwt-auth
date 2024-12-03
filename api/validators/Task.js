import validateRequest from '../utils/ValidateRequest.js';
import * as Yup from 'yup';

export const submitTaskSchema = Yup.object({
  body: Yup.object({
    n: Yup.number()
      .required('Поле обязательно')
      .typeError('Значение должно быть числом')
      .min(0, 'Минимальное значение - 0')
      .max(1000, 'Максимальное значение - 1000'),
  }),
});

class TaskValidator {
  static async submit(req, res, next) {
    return validateRequest(req, res, next, submitTaskSchema);
  }
}

export default TaskValidator;
