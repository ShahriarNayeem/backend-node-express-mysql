const Joi = require('joi');
const dotenv = require('dotenv').config();

/**
 * Error on unsuccessful loading of .env
 */
if (dotenv.error) {
  throw new Error(`Problem loading .env file: ${dotenv.error.message}`);
}

/**
 * Validation schema for .env
 */
const schema = Joi.object({
  APP_NAME: Joi.string().default('node-rest-starter'),

  NODE_ENV: Joi.string()
    .lowercase()
    .trim()
    .valid('dev', 'prod', 'test', 'stage')
    .default('dev'),

  PORT: Joi.number().default(9100),

  MYSQL_USERNAME: Joi.string()
    .required()
    .description('Mysql UserName'),

  MYSQL_PASSWORD: Joi.string()
    .allow(null, '')
    .required()
    .description('Mysql Password'),

  MYSQL_HOST: Joi.string()
    .required()
    .description('Mysql Host'),

  MYSQL_DATABASE: Joi.string()
    .required()
    .description('Mysql Database'),

  JWT_SECRET: Joi.string()
    .required()
    .description('JWT Secret required to sign'),
})
  .unknown()
  .required();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env validation error: ${error.message}`);
}

/**
 * Const to contain validated env vers
 */
const env = {
  appName: value.APP_NAME,
  nodeEnv: value.NODE_ENV,
  port: value.PORT,
  mysql: {
    username: value.MYSQL_USERNAME,
    password: value.MYSQL_PASSWORD,
    database: value.MYSQL_DATABASE,
    host: value.MYSQL_HOST,
    port: value.MYSQL_PORT,
    dialect: value.MYSQL_DIALECT,
    logging: false,
  },
  jwtSecret: value.JWT_SECRET,
};

module.exports = env;
