import TestCaseRepository from '../repositories/TestCase.js';

class TestCaseService {
  static async create({ userId, data }) {
    const id = await TestCaseRepository.create({ userId, data });
    return id;
  }

  static async getByUserId(userId) {
    const testCases = await TestCaseRepository.getByUserId(userId);
    return testCases.map((test) => {
      return {
        id: test.id,
        n: test.n,
        expectedResult: test.expected_result,
      };
    });
  }

  static async update({ testId, data }) {
    await TestCaseRepository.update({ testId, data });
  }

  static async delete(testId) {
    await TestCaseRepository.delete(testId);
  }
}

export default TestCaseService;
