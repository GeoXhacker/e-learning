const { DataTypes } = require("sequelize");
const sequelize = require('./seq');

module.exports = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: DataTypes.NUMBER,
  class: DataTypes.STRING,
  bio: DataTypes.STRING
});

