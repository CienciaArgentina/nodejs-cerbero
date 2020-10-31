import { validateToken, includeClaims, validateTokenData, verifyJWT } from './service';
import * as validators from './utils/validators/post';
import * as service from './service';

const forwardRequest = {
  jwt: 'string',
};
describe('/forward-auth/verifyToken', () => {
  const validateForwardAuthScheme = jest.spyOn(validators, 'validateForwardAuthScheme');
  const includeClaims = jest.spyOn(service, 'includeClaims');
  const validateTokenData = jest.spyOn(service, 'validateTokenData');
  const verifyJWT = jest.spyOn(service, 'verifyJWT');

  test('Should not return anything when jwt is valid', async () => {
    validateForwardAuthScheme.mockReturnValue(null);
    includeClaims.mockReturnValue(true);
    validateTokenData.mockReturnValue([]);
    verifyJWT.mockReturnValue('');

    validateToken(forwardRequest);
    expect(validateToken).toHaveBeenCalled();
  });
});
