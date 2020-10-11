import { HTTP404Error } from 'ciencia-argentina-backend-commons';
import { findGenderById } from './repository';
import Gender from '../../models/Gender';

export const getById = async (id: string): Promise<Gender> => {
  const gender = await findGenderById(id);
  if (!gender) throw new HTTP404Error();

  return gender;
};
