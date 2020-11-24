import { HTTPCienciaError } from 'ciencia-argentina-backend-commons';
import { ForwardAuth } from './models';
import { validateForwardAuthScheme, validateTokenData } from './utils/validators/post';
import { HttpStatusErrorCode } from 'ciencia-argentina-backend-commons/dist/commons/constants';
import { verifyJWT } from './utils/functions';

export const validateToken = async (forwardAuthRequest: ForwardAuth): Promise<void> => {
  const validationError = validateForwardAuthScheme(forwardAuthRequest);

  if (validationError) throw validationError;

  const { jwt, required_claim } = forwardAuthRequest;

  const token = await verifyJWT(jwt);

  const errors = validateTokenData(token, required_claim);
  if (errors.length) throw new HTTPCienciaError(HttpStatusErrorCode.Unauthorized, 'invalid_token', errors);
};
