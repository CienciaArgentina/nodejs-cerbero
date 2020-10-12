import { Request, Response } from 'express';
import { HttpStatusCode } from '../../commons/constants';

import {
	verifyToken
} from './service'

export default [
  {
    path: '/forward-auth',
    method: 'post',
    handler: [
	  async ({body}: Request, res: Response): Promise<void> => {
		const result = verifyToken(body);
        res.status(HttpStatusCode.Ok).send(result);
      }
    ]
  },
];