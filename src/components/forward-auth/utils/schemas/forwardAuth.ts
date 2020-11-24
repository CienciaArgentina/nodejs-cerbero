import { JSONSchema7 } from 'json-schema';

export const forwardAuth: JSONSchema7 = {
  type: 'object',
  properties: {
    jwt: {
      type: ['string'],
    },
    required_claim: {
      type: ['string'],
    },
  },
  required: ['jwt'],
  additionalProperties: false,
};
