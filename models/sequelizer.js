const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});


sequelize.authenticate()
.then(() => {
    console.log('Connection to database established successfully.');
})
.catch(err => {
    console.log('Unable to connect to the database: ', err);
});

// sequelize.sync({ force: true });

module.exports = sequelize