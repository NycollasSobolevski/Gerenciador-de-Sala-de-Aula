const Sequelize  = require('sequelize');
const database = require('../config/db');
const sala = require('../model/sala')

const aluno = database.define('Aluno',{
    IDAluno: {
        type: Sequelize. INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Nome:{
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    Nascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    Sexo: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    Foto:{
        type: Sequelize.STRING(50),
        allowNull: false
    }
});


module.exports = aluno;

aluno.belongsTo(sala, {
    constranint: true,
    foreignKey: 'IDSala'
})