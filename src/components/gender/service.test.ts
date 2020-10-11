// import * as repository from './repository';
// import { Gender } from '../../entities/Gender';
// import { getById } from './service';
// import { HTTP404Error } from '../../utils/error/HTTP400Error';

// const _mockFakeId = '1231231';
// const _mockValidId = '1234';
// const genderMock: Gender = {
//   id: _mockValidId,
//   description: 'gender',
//   dateCreated: new Date()
// };
// describe('GenderService', () => {
//   describe('getById', () => {
//     test('Should return equal gender that receive when pass valid id', async () => {
//       const findGenderById = jest.spyOn(repository, 'findGenderById');
//       findGenderById.mockResolvedValue(genderMock);

//       const response = await getById(_mockValidId);
//       expect(response).toEqual(genderMock);
//     });

//     test('Should return not found gender when pass invalid id', async () => {
//       const findGenderById = jest.spyOn(repository, 'findGenderById');
//       findGenderById.mockResolvedValue(undefined);
//       await expect(getById(_mockFakeId)).rejects.toThrow(HTTP404Error);
//     });
//   });
// });
