const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
const sequelize = new Sequelize(
    "golive_db",
    "postgres",
    "password", {
        host: "localhost",
        dialect: "postgres",
        define: {
            timestamps: false
          }
    }
);
module.exports = sequelize;
