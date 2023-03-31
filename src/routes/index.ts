import express from 'express';
import { Request, Response } from 'express';
import resize from './api/resize';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('main api');
});

routes.use('/resize', resize);

export default routes;
