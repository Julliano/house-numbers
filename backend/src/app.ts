import express from 'express';
import cors from 'cors';

import snippetsRouter from './routes/snippets';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/snippets', snippetsRouter);

export default app;