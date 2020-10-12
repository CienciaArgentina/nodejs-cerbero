import { HttpStatusCode } from '../../commons/constants';
import { Request, Response } from 'express';

export default [
  {
    path: '/ping',
    method: 'get',
    handler: [
      async (req: Request, res: Response): Promise<void> => {
        res.status(HttpStatusCode.Ok).send('ok');
      },
    ],
  },
];
