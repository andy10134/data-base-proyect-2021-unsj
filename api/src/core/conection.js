const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
// const sequelize = new Sequelize('postgres://postgress:@localhost:5432/golive_db') // Example for postgres

// Option 2: Passing parameters separately (other dialects)
export const sequelize = new Sequelize(
  'golive_db',          // db name
  'postgres',           // username
  'Alanorma1',               // pass
  {
    host: 'localhost',
    dialect:'postgres',
    pool:
    {
      max:5,
      min:0,
      require: 30000,
      idle: 10000
    },
    loggin: false,
    define: {
      timestamps: false
    }
  }
);
