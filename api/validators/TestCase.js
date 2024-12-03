import validateRequest from '../utils/ValidateRequest.js';
import * as Yup from 'yup';

export const testCaseSchema = Yup.object({
  body: Yup.object({
    n: Yup.number()
      .required('Поле обязательно')
      .typeError('Значение должно быть числом')
      .min(0, 'Минимальное значение - 0')
      .max(1000, 'Максимальное значение - 1000'),
    expectedResult: Yup.number()
      .required('Поле обязательно')
      .typeError('Значение должно быть числом'),
  }),
});

export const querySchema = Yup.object({
  query: Yup.object({
    testId: Yup.number()
      .required('Поле обязательно')
      .typeError('Значение должно быть числом'),
    userId: Yup.number()
      .required('Поле обязательно')
      .typeError('Значение должно быть числом'),
  }),
});

export const createSchema = Yup.object({
  query: querySchema.fields.query.userId,
  body: testCaseSchema.fields.body,
});

export const getByUserIdSchema = Yup.object({
  query: querySchema.fields.query.userId,
});

export const updateSchema = Yup.object({
  query: querySchema.fields.query.testId,
  body: testCaseSchema.fields.body,
});

export const deleteSchema = Yup.object({
  query: querySchema.fields.query.testId,
});

class TestCaseValidator {
  static async create(req, res, next) {
    return validateRequest(req, res, next, createSchema);
  }

  static async getByUserId(req, res, next) {
    return validateRequest(req, res, next, getByUserIdSchema);
  }

  static async update(req, res, next) {
    return validateRequest(req, res, next, updateSchema);
  }

  static async delete(req, res, next) {
    return validateRequest(req, res, next, deleteSchema);
  }
}

export default TestCaseValidator;
