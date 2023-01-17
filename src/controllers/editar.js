const sala = require("../model/sala");
const aluno = require('../model/aluno');
// const { restart } = require("nodemon");

module.exports = {
    async alunos(req, res) {
        const parametro = req.params.id;

        const alunos = await aluno.findByPk(parametro, {
            raw: true,
            attributes: ['IDAluno', 'Nome', 'Idade', 'Sexo', 'Foto', 'IDSala']
        });'

        const salas = await sala.findAll({
            raw: true,
            attributes: ['IDSala', 'Nome']
        });

        res.render('../views/editarAluno', { salas, alunos });
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
            Idade: dados.idade,
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
            attributes: ['IDSala', 'Nome', 'Capacidade']
        });

        res.render('../views/editarSalas', { salas });
    },

    async salasUpdate(req, res){
        const dados = req.body;
        const id = req.params.id;

        await sala.update({
            Nome: dados.nome,
            Capacidade: dados.capacidade
        },
        {
            where: { IDSala: id}
        });



        res.redirect('/');
    }
}
