import { forwardAuth } from '../schemas/forwardAuth';
import {
  CienciaError,
  HTTPCienciaError,
  HttpCienciaError,
  validateJsonSchema,
} from 'ciencia-argentina-backend-commons';
import { ForwardAuth } from '../../models';

export const validateForwardAuthScheme = (forwardAuthDTO: ForwardAuth): HTTPCienciaError | null => {
  return validateJsonSchema(forwardAuth, forwardAuthDTO);
};
