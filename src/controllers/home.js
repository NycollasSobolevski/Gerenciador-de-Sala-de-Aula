const sala = require('../model/sala');
const aluno = require('../model/aluno');
const { sala } = require('./cadastro');

module.exports = {
    async pagInicialGet(req, res) {
        const id = req.body.nome;

        const salas = await sala.findAll({
            raw: true,  // Retorna somente os valores de uma tabela, sem metadados
            atributes: ['IDSala', 'Nome']
        });

        const alunos = await aluno.findAll({
            raw: true,
            atributes: ['Nome', 'Idade', 'Foto', 'IDSala']
        });
        // renderizando as salas para o front
        res.render('../views/index.ejs', {salas, alunos:'', id:''})
    },

    async pagInicialPost(req, res){
        const id = req.body.nome;

        const alunos = await aluno.findAll({
            raw: true,
            atributes: ['IDAluno', 'Nome','Idade','Foto'],
            where: {IDSala: id}
        });''

        const sala = await sala.findAll({
            raw:true,
            atributes: ['IDSala','Nome']
        });

        res.render('../views/index.ejs', {salas, alunos, id})
    }

    
}
