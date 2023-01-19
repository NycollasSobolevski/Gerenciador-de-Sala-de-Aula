const sala = require("../model/sala");
const aluno = require('../model/aluno');
// const { restart } = require("nodemon");

module.exports = {
    async alunos(req, res) {
        const parametro = req.params.id;
        const idSala = req.body.sala
        const alunos = await aluno.findByPk(parametro, {
            raw: true,
            attributes: ['IDAluno', 'Nome', 'Nascimento', 'Sexo', 'Foto', 'IDSala']
        });

        const salas = await sala.findAll({
            raw: true,
            attributes: ['IDSala', 'Nome']
        });

        res.render('../views/editarAluno', { salas, alunos });
    },

    async excluirAluno(req, res){
        const id = req.params.id;

        aluno.destroy({
            where: {IDAluno: id}
        });

        res.redirect('/');
    },

    async adicionar(req, res) {
        const dados = req.body;
        const id = req.params.id;

        if (req.file) {
            const antigaFoto = await aluno.findAll({
                raw: true,
                attributes: ['Foto'],
                where: {IDAluno: id}
            });

            if (antigaFoto[0].Foto != 'profile_avatar.jpg') {
                FileSystem.unlink(`public/img/${antigaFoto[0].Foto}`, (err => {
                    if(err)
                        console.log(err);
                    } 
                ));
            }
         
            // Update da nova foto no DB
            await aluno.update(
                { Foto: req.file.filename },
                { where: { IDAluno: id } }
            );
        }

        await aluno.update({
            Nome: dados.nome,
            Nascimento: dados.nascimento,
            Sexo: dados.sexo,
            IDSala: dados.sala
        },
            {
                where: { IDAluno: id }
            });

        res.redirect('/');
    },




    async salas(req,res){
        const id = req.params.id;

        const salas = await sala.findByPk(id,{
            raw: true,
            attributes: ['IDSala', 'Nome', 'Capacidade','IdadeMinima','IdadeMaxima']
        });

        res.render('../views/editarSalas', { salas });
    },

    async salasUpdate(req, res){
        const dados = req.body;
        const id = req.params.id;

        await sala.update({
            Nome: dados.nome,
            Capacidade: dados.capacidade,
            IdadeMinima: dados.idadeMinima,
            IdadeMaxima: dados.idadeMaxima
        },
        {
            where: { IDSala: id}
        });
        res.redirect('/');
    },

    async excluirSala(req, res){
        const id = req.params.id;
        const alunos = await aluno.findAll({
            raw:true,
            params: ['IDAluno','IDSala'],
            where: {IDSala: id}
            }
        )
        if (alunos.count == 0) {
            sala.destroy({
                where: {IDSala: id}
            });
            res.redirect('/');
        }
    },
}
