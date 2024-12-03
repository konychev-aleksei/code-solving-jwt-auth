import TaskService from '../services/Task.js';
import ErrorsUtils from '../utils/Errors.js';

class TaskController {
  static async submit(req, res) {
    const { n } = req.body;

    try {
      const result = TaskService.getTaskSolution(n);

      return res.status(200).json(result);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}

export default TaskController;
