const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// (async () => {
//     await sequelize.sync({ force: true });
// })();

module.exports = sequelize;