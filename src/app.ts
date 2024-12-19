import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
const app: Application = express();

//parse
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

//application router

app.use('/api/v1', router);

app.use(globalErrorHandler);

//not found

app.use(notFound);

const test = (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
};
app.get('/', test);

export default app;
