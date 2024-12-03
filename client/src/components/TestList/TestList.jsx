import { useContext, useEffect, useState } from 'react';
import { TestCase } from '../TestCase/ui/TestCase';
import styles from './TestList.module.scss';
import { Button } from '../../ui';
import { AuthContext, ResourceClient } from '../../context/AuthContext';
import showErrorMessage from '../../utils/showErrorMessage';

export const TestList = () => {
  const [testCases, setTestCases] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const {
    user: { userId },
  } = useContext(AuthContext);

  const addTestCase = () => {
    ResourceClient.post(`/test-case/create?userId=${userId}`, {
      n: 0,
      expectedResult: 0,
    })
      .then((response) => {
        const newTest = {
          id: response.data,
          n: 0,
          expectedResult: 0,
          factResult: '',
        };

        setTestCases((prev) => [...prev, newTest]);
      })
      .catch(showErrorMessage);
  };

  const deleteTestCase = (testId) => {
    if (!window.confirm('Вы уверены, что хотите удалить тесткейс?')) {
      return;
    }

    ResourceClient.delete(`/test-case/delete?testId=${testId}`)
      .then(() => {
        setTestCases((prev) => prev.filter((test) => test.id !== testId));
      })
      .catch(showErrorMessage);
  };

  useEffect(() => {
    setLoading(true);

    ResourceClient.get(`/test-case/get-by-user-id?userId=${userId}`)
      .then((res) => {
        setTestCases(res.data);
      })
      .catch(showErrorMessage)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Загрузка тестов...</p>;
  }

  return (
    <>
      <Button onClick={addTestCase}>Добавить тест-кейс</Button>
      <div className={styles.list}>
        {testCases.map((test, index) => {
          return (
            <TestCase
              key={test.id}
              onDelete={deleteTestCase}
              num={index}
              {...test}
            />
          );
        })}
      </div>
    </>
  );
};
