import ErrorsUtils from '../utils/Errors.js';
import TestCaseService from '../services/TestCase.js';

class TaskController {
  static async create(req, res) {
    const { userId } = req.query;
    const data = req.body;

    try {
      const id = await TestCaseService.create({ userId, data });

      return res.status(200).json(id);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async getByUserId(req, res) {
    const { userId } = req.query;

    try {
      const result = await TestCaseService.getByUserId(userId);

      return res.status(200).json(result);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async update(req, res) {
    const { testId } = req.query;
    const data = req.body;

    try {
      await TestCaseService.update({ testId, data });

      return res.status(200).json('Test case updated');
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async delete(req, res) {
    const { testId } = req.query;

    try {
      await TestCaseService.delete(testId);

      return res.status(200).json('Test case deleted');
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}

export default TaskController;
