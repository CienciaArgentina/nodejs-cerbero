import { Request, Response } from 'express';
import { HttpStatusCode } from '../../commons/constants';
import { validateToken } from './service';
import { Paths } from './utils/constants';

export default [
  {
    path: Paths.ForwardAuth,
    method: 'post',
    handler: [
      async ({ body }: Request, res: Response): Promise<void> => {
        await validateToken(body);
        res.status(HttpStatusCode.Ok).send();
      },
    ],
  },
];
