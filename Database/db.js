const { Sequelize } = require("sequelize");
const { database_config } = require("./config");

const sequelize = new Sequelize(
  database_config.database,
  database_config.username,
  database_config.password,
  {
    host: database_config.host,
    port: database_config.port,
    dialect: "mssql",
    dialectModule: require("tedious"),
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true,
        cryptoCredentialsDetails: {
          minVersion: "TLSv1",
        },
        connectTimeout: 30000,
        logging: console.log,
      },
    },
  },
);

module.exports = sequelize;
