import { TableNames } from '../commons/constants';
import { Model } from 'objection';

export default class Gender extends Model {
  Id!: number;
  description!: string;
  dateCreated!: Date;
  dateDeleted?: Date;

  static tableName = TableNames.Gender;
}
