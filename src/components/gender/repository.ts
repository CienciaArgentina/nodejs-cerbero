import Gender from '../../models/Gender';

export const findGenderById = async (id: string): Promise<Gender | undefined> => {
  const gender = await Gender.query().findById(id);
  return gender;
};
