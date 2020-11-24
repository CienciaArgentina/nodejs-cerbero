export enum ErrorCode {
  NotFound = 'cerberos.not.found',
  BadRequest = 'cerberos.bad.request',
  InternalServerError = 'cerberos.internal.server.error',
  Unauthorized = 'cerberos.unauthorized',
}

export enum ErrorDescription {
  NotFound = 'NotFound',
  Unauthorized = 'Unauthorized',
  BadRequest = 'BadRequest',
  InternalServerError = 'Internal Server Error',
}

export const signatureOrPayloadInvalid = [
  {
    code: 'signature_or_jwt_invalid',
    detail: 'signature or payload invalid',
  },
];
