import {forwardAuth} from '../schemas/forwardAuth'
import {ValidationError,validateJsonSchema} from 'ciencia-argentina-backend-commons'
import { ForwardAuth } from '../../models';

export const validateForwardAuthScheme = (forwardAuthDTO: ForwardAuth): ValidationError | null => {
    return validateJsonSchema(forwardAuth,forwardAuthDTO);
};
    