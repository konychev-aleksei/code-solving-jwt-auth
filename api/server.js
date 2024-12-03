import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Fingerprint from 'express-fingerprint';

import AuthRootRouter from './routers/Auth.js';
import TaskRootRouter from './routers/Task.js';
import TestCaseRootRouter from './routers/TestCase.js';

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173', // URL вашего фронтенда
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Если передаются cookie
  })
);

app.use(
  Fingerprint({
    parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders],
  })
);

app.use('/auth', AuthRootRouter);

app.use('/task', TaskRootRouter);

app.use('/test-case', TestCaseRootRouter);

app.listen(5000, () => {
  console.log('Сервер успешно запущен');
});
