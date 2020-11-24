import { HTTPCienciaError, logger } from 'ciencia-argentina-backend-commons';
import { promisify } from 'util';
import { verify } from 'jsonwebtoken';
import { JwtToken } from '../models';
import { HttpStatusErrorCode, signatureOrPayloadInvalid } from '../../../commons/constants';

export const verifyJWT = async (jwt: string): Promise<JwtToken> => {
  const verifyAsync = promisify(verify);
  const result = <JwtToken>await verifyAsync(jwt, process.env.JWT_SIGNATURE || '').catch((e) => {
    logger.error({
      error: e,
      jwt,
    });
    throw new HTTPCienciaError(HttpStatusErrorCode.Unauthorized, 'invalid_token', signatureOrPayloadInvalid);
  });
  return result;
};
