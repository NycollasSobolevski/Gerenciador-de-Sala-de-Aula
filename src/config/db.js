const sequelize = require('sequelize');
// configuracoes da base de dados
const database = new sequelize('Controle_de_Estudantes', 'ControleEstudantes' , 'ControleEstudantesPassword',
    {
        dialect: 'mssql', host:'localhost', port:1433
    });
database.sync();
module.exports = database;