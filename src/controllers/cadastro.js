// importando tabelas 

const sala = require("../model/sala");
const aluno = require('../model/aluno');

module.exports = {
    async sala(req, res){
        res.render('../views/index')
    },

    async salaInsert(req, res){
        // recebe as info do front
        const dados = req.body;
        // Criando a Sala no DB
        await sala.create({
            Nome: dados.nome,
            Capacidade: dados.capacidade
        });

        // Redirecionar para a pagina principal
        res.redirect('/');
    },

    async aluno(req, res){
        // Encontrando salas no DB
        const salas = await sala.findAll({
            raw: true,  // Retorna somente os valores de uma tabela, sem metadados
            atributes: ['IDSala','Nome']
        });

        // renderizando as salas para o front
        res.render('../views/index.ejs', {salas});
    },

    async alunoInsert(req, res){
        const dados = req.body;

        let foto = 'profile_avatar.jpg';

        if (req.file) {
            foto = req.file.filename;
        }

        await aluno.create({
            Nome: dados.nome,
            Idade: dados.idade,
            Sexo: dados.sexo,
            IDSala: dados.sala,
            Foto: foto
        });

        res.redirect('/');
    }
}


