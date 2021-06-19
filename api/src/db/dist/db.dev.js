"use strict";

var _require = require('sequelize'),
    Sequelize = _require.Sequelize; // Option 1: Passing a connection URI


var sequelize = new Sequelize("golive_db", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
  define: {
    timestamps: false
  }
});
module.exports = sequelize;