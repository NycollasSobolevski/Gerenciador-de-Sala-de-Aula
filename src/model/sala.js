// importacao 
const Sequelize = require('sequelize');
const database  = require('../config/db');

//Criando a tabela 'sala'
const sala = database.define('Sala', {
    IDSala: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Nome:{
        type: Sequelize.STRING(50),
        allowNull: false
    },
    Capacidade:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    IdadeMinima:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    IdadeMaxima:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});


// Exportando essa tabela
module.exports = sala;