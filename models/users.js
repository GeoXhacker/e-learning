const sequelize = require('./sequelizer')
const { DataTypes } = require("sequelize")

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
    }
});
  