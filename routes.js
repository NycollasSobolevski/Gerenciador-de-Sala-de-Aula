// Iniciando o Route do Express
const express = require('express');
const route   = express.Router();

// Importando os Controllers
const home = require('./src/controllers/home.js');
const cadastro = require("./src/controllers/cadastro.js")

// iniciando as Rotas
route.get('/', home.pagInicialGet);
route.post('/', cadastro.aluno)
route.post('/', cadastro.alunoInsert)
route.post('/', cadastro.salaInsert)
module.exports = route;