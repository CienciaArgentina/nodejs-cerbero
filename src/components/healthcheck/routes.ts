import { getHealth } from './service';
import { ResourceHealth } from './ResourceHealth';
import { HttpStatusCode, HttpStatusErrorCode } from '../../commons/constants';
import { Request, Response } from 'express';
import { CienciaArgentinaConnectionCheck } from './servicesCheck/CienciaArgentinaConnectionCheck';

export default [
  {
    path: '/health',
    method: 'get',
    handler: [
      async (req: Request, res: Response): Promise<void> => {
        const healthResults = await getHealth([new CienciaArgentinaConnectionCheck()]);

        res
          .status(
            healthResults.status === ResourceHealth.Healthy ? HttpStatusCode.Ok : HttpStatusErrorCode.ServiceUnavailable
          )
          .send(healthResults);
      },
    ],
  },
];
