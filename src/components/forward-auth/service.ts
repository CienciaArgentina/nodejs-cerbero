import { verify } from 'jsonwebtoken';
import { HTTP400Error, HTTP401Error, HttpValidationError } from 'ciencia-argentina-backend-commons';
import { Roles, ForwardAuth, JwtToken } from './models';
import dotenv from 'dotenv';
import { validateForwardAuthScheme } from './utils/validators/post';
dotenv.config();

const includeClaims = (roles: Roles[], required_claim: string): boolean => {
  return !!roles.find((r) => r.claims.find((c) => c.description.toLowerCase() === required_claim.toLowerCase()));
};

export const verifyToken = (forwardAuthRequest: ForwardAuth): JwtToken => {
  const { jwt, required_claim } = forwardAuthRequest;

  const errors = validateForwardAuthScheme(forwardAuthRequest);

  if (errors) throw new HttpValidationError(errors);
  const decoded: JwtToken | string = verify(jwt, process.env.JWT_SIGNATURE || '');

  //https://tools.ietf.org/html/rfc6750
  if (!decoded || typeof decoded === 'string' || !decoded.expires_at || !decoded.roles)
    throw new HTTP401Error('invalid_token');

  if (decoded.expires_at < new Date().getTime() / 1000) throw new HTTP401Error('token expired');

  if (!includeClaims(decoded.roles, required_claim)) throw new HTTP401Error('not included claims');

  return decoded;
};
