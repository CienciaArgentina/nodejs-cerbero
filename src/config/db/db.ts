import Knex from 'knex';
import { Model } from 'objection';

export const connectDb = async (config: object): Promise<void> => {
  const knex = Knex(config);
  Model.knex(knex);
  //TODO: Health a la db
};
