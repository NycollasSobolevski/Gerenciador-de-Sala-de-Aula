// Iniciando o Route do Express
const express = require('express');
const route   = express.Router();

const multer = require("multer");
const config = require("./src/config/multer");


// Importando os Controllers
const home = require('./src/controllers/home.js');
const cadastro = require("./src/controllers/cadastro.js");
const editar = require('./src/controllers/editar');


// iniciando as Rotas
route.get('/', home.pagInicialGet);
route.post('/', home.pagInicialPost);

route.get('/', cadastro.sala);
route.post('/cadastroSala', cadastro.salaInsert);

route.get('/', cadastro.aluno);
route.post('/cadastroAluno', multer(config).single('foto'), cadastro.alunoInsert);

route.get('/editarAluno/:id', editar.alunos);
route.post('/editarAluno/:id', multer(config).single('foto'), editar.adicionar);
route.post('/apagarAluno/:id', editar.excluirAluno)

route.get('/editarSalas/:id', editar.salas);
route.post('/editarSalas/:id', editar.salasUpdate);
route.post('/apagarSala/:id', editar.excluirSala)


module.exports = route;