/* eslint-disable global-require */
/**
 * Wrap all console logs with consola
 */
const consola = require('consola');

consola.wrapAll();

const mysql = require('mysql2');
const app = require('./config/express');
const env = require('./config/environment');

/**
 * Get Database Connection Value
 */
const { host, username, password } = env.mysql;

/**
 * on database connection start server
 */
const startServer = () => {
  const db = require('./models');
  db.sequelize.sync({ force: true }).then(async () => {
    app.listen(env.port, () => {
      consola.ready({
        message: `${env.appName} Server`,
        badge: true,
      });
      consola.log('-------------------------------------------------');
      consola.info(`Environment: ${env.nodeEnv}`);
      consola.info(`Port: ${env.port}`);
      consola.info(`Base uri: http://localhost:${env.port}/api`);
    });
  });
};

/**
 * Start application if not running test
 */
if (env.nodeEnv !== 'test') {
  const connection = mysql.createConnection({
    host,
    user: username,
    password,
  });

  connection.connect(async (err) => {
    if (err) {
      throw err;
    } else {
      connection.query('CREATE DATABASE inventory', async (error) => {
        if (error) {
          startServer();
        } else {
          startServer();
        }
      });
    }
  });
}

module.exports = app;
