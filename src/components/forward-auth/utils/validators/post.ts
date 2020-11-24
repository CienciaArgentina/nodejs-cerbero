import { forwardAuth } from '../schemas/forwardAuth';
import { CienciaError, HTTPCienciaError, validateJsonSchema } from 'ciencia-argentina-backend-commons';
import { ForwardAuth, JwtToken, Roles } from '../../models';
import { HttpStatusErrorCode, signatureOrPayloadInvalid } from '../../../../commons/constants';

export const validateForwardAuthScheme = (forwardAuthDTO: ForwardAuth): HTTPCienciaError | null => {
  return validateJsonSchema(forwardAuth, forwardAuthDTO);
};

const includeClaims = (roles: Roles[], required_claim: string): boolean => {
  return !!roles.find((r) => r.claims.find((c) => c.description.toLowerCase() === required_claim.toLowerCase()));
};

export const validateTokenData = (token: JwtToken, required_claim?: string): CienciaError[] => {
  const errors: CienciaError[] = [];

  if (!token.roles)
    throw new HTTPCienciaError(HttpStatusErrorCode.Unauthorized, 'invalid_token', signatureOrPayloadInvalid);

  if (!required_claim) return errors;

  const roles = <Roles[]>JSON.parse(token.roles);
  if (!includeClaims(roles, required_claim))
    errors.push({
      code: 'not_included_claims',
      detail: 'not_included_claims',
    });

  return errors;
};
