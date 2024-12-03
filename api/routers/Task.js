import { Router } from 'express';
import TokenService from '../services/Token.js';
import TaskController from '../controllers/Task.js';
import TaskValidator from '../validators/Task.js';

const router = Router();

router.post(
  '/submit',
  TokenService.checkAccess,
  TaskValidator.submit,
  TaskController.submit
);

export default router;
