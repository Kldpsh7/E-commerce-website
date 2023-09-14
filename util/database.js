const Sequelize = require('sequelize');

const sequelize = new Sequelize('node.js','root','kldpsh7@8447',{
    dialect : 'mysql'
});

module.exports = sequelize;