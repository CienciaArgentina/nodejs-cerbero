import { JSONSchema7 } from 'json-schema'

export const forwardAuth: JSONSchema7 = {
    type: 'object',
    properties: {
        'jwt': {
            type: ['string']
        },
        'expired_at': {
            type: ['number']
        },
    },
    required: ['jwt','expired_at'],
    additionalProperties: false
}