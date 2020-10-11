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
		/**
		 * Validar JWT firma
		 * Validar expirado
		 * Validar claims
		 */                                                                                                                                                                                        
		const token = body.jwt
		const required_claim = body.required_claim
		const result = verifyToken(token, required_claim)

        res.status(HttpStatusCode.Ok).send();
      }
    ]
  },
];