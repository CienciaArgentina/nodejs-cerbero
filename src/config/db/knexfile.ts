import dotenv from 'dotenv'
dotenv.config();

export const cienciaArgDb = {
    client: 'mysql',
    connection: {
      host: process.env.DB_CIENCIAARG_HOST,
      user: process.env.DB_CIENCIAARG_USERNAME,
      password: process.env.DB_CIENCIAARG_PASSWORD,
      port: process.env.DB_CIENCIAARG_PORT,
      database: process.env.DB_CIENCIAARG_NAME,
    },
    pool: {
      min: process.env.DB_CIENCIAARG_POOL_MIN || 1,
      max: process.env.DB_CIENCIAARG_POOL_MAX || 20,
    },
    debug:true
  };
