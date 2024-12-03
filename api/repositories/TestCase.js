import pool from '../db.js';

class TestCaseRepository {
  static async getByUserId(userId) {
    const response = await pool.query(
      'SELECT * FROM test_cases WHERE user_id=$1',
      [userId]
    );

    return response.rows;
  }

  static async create({ userId, data }) {
    const { n, expectedResult } = data;

    const response = await pool.query(
      'INSERT INTO test_cases (user_id, n, expected_result) VALUES ($1, $2, $3) RETURNING id',
      [userId, n, expectedResult]
    );

    return response.rows[0].id;
  }

  static async update({ testId, data }) {
    const { n, expectedResult } = data;

    await pool.query(
      'UPDATE test_cases SET n = $2, expected_result = $3 WHERE id = $1',
      [testId, n, expectedResult]
    );
  }

  static async delete(testId) {
    await pool.query('DELETE FROM test_cases WHERE id=$1', [testId]);
  }
}

export default TestCaseRepository;
