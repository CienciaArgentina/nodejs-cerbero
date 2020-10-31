import { verify } from 'jsonwebtoken';
import { CienciaError, HTTPCienciaError } from 'ciencia-argentina-backend-commons';
import { Roles, ForwardAuth, JwtToken } from './models';
import dotenv from 'dotenv';
import { validateForwardAuthScheme } from './utils/validators/post';
import { HttpStatusErrorCode } from 'ciencia-argentina-backend-commons/dist/commons/constants';
dotenv.config();

export const includeClaims = (roles: Roles[], required_claim: string): boolean => {
  return !!roles.find((r) => r.claims.find((c) => c.description.toLowerCase() === required_claim.toLowerCase()));
};

export const validateTokenData = (token: string | JwtToken, required_claim: string): CienciaError[] => {
  const errors: CienciaError[] = [];

  if (!token || typeof token === 'string' || !token.expires_at || !token.roles || typeof token.roles !== 'object')
    throw new HTTPCienciaError(HttpStatusErrorCode.Unauthorized, 'invalid_token');

  if (token.expires_at < new Date().getTime() / 1000)
    errors.push({
      code: 'token_expired',
      detail: 'token_expired',
    });

  if (!includeClaims(token.roles, required_claim))
    errors.push({
      code: 'not_included_claims',
      detail: 'not_included_claims',
    });

  return errors;
};

export const verifyJWT = (jwt: string): JwtToken | string => {
  return verify(jwt, process.env.JWT_SIGNATURE || '');
};

export const validateToken = (forwardAuthRequest: ForwardAuth): void => {
  const validationError = validateForwardAuthScheme(forwardAuthRequest);

  if (validationError) throw validationError;

  const { jwt, required_claim } = forwardAuthRequest;

  const token: JwtToken | string = verifyJWT(jwt);

  const errors = validateTokenData(token, required_claim);
  if (errors.length) throw new HTTPCienciaError(HttpStatusErrorCode.Unauthorized, 'invalid_token', errors);
};
