const { Sequelize } = require("sequelize");
const { database_config } = require("./config");

const sequelize = new Sequelize(
  database_config.database,
  database_config.username,
  database_config.password,
  {
    host: database_config.host,
    dialect: database_config.dialect,
    port: database_config.port,
    dialectOptions: {
      options: {
        encrypt: true,
        //trustServerCertificate: true,
        cryptoCredentialsDetails: {
          minVersion: "TLSv1",
        },
        instanceName: "sql1",
        requestedTimeout: 30000,
      },
    },
    server: database_config.host,
  },
);

module.exports = sequelize;
