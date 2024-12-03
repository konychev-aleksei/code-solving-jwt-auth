import { Router } from 'express';
import TokenService from '../services/Token.js';
import TestCaseController from '../controllers/TestCase.js';
import TestCaseValidator from '../validators/TestCase.js';

const router = Router();

router.post(
  '/create',
  TokenService.checkAccess,
  TestCaseValidator.create,
  TestCaseController.create
);

router.get(
  '/get-by-user-id',
  TokenService.checkAccess,
  TestCaseValidator.getByUserId,
  TestCaseController.getByUserId
);

router.put(
  '/update',
  TokenService.checkAccess,
  TestCaseValidator.update,
  TestCaseController.update
);

router.delete(
  '/delete',
  TokenService.checkAccess,
  TestCaseValidator.delete,
  TestCaseController.delete
);

export default router;
