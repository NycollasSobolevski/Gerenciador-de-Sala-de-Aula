const sala = require('../model/sala');
const aluno = require('../model/aluno');

module.exports = {
    async pagInicialGet(req, res) {
        const id = req.body.SelectSala;

        const salas = await sala.findAll({
            raw: true,  // Retorna somente os valores de uma tabela, sem metadados
            atributes: ['IDSala', 'Nome', 'Capacidade']
        });

        let alunos = await aluno.findAll({
            raw: true,
            atributes: ['Nome', 'Nascimento', 'Foto', 'IDSala']
        });
        alunos = alunos.map(aluno => {
            const date = new Date();
            const sla = new Date(aluno.Nascimento);

            const dias = (date - sla) / 86400000
            const anos = dias / 365
            aluno.Idade = Math.round(anos)

            return aluno
        })

        // renderizando as salas para o front
        res.render('../views/index.ejs', {salas, alunos, id:'',salaSelecionada:'', frase:'', alunoIns: false , salaIns: false });
    },

    async pagInicialPost(req, res){
        const id = req.body.SelectSala;

        const salas = await sala.findAll({
            raw:true,
            atributes: ['IDSala','Nome', 'Capacidade', 'IdadeMinima', 'IdadeMaxima']
        });

        const salaSelecionada = await sala.findAll({
            raw: true,
            atributes: ['IDSala','Nome', 'Capacidade'],
            where: {IDSala: id}
        })

        if (id!="") {
            let alunos = await aluno.findAll({
                raw: true,
                atributes: ['IDAluno', 'Nome','Nascimento','Foto', 'IDSala'],
                where: {IDSala: id},
            });
            alunos = alunos.map(aluno => {
                const date = new Date();
                const sla = new Date(aluno.Nascimento);
    
                const dias = (date - sla) / 86400000;
                const anos = dias / 365;
                aluno.Idade = Math.round(anos);
    
                return aluno;
            });
    
            res.render('../views/index.ejs', { salas, salaSelecionada, alunos, id, frase:'', alunoIns: false, salaIns: false });
        }
        let alunos = await aluno.findAll({
            raw: true,
            atributes: ['IDAluno', 'Nome','Nascimento','Foto', 'IDSala'],
        });

        
        alunos = alunos.map(aluno => {
            const date = new Date();
            const sla = new Date(aluno.Nascimento);

            const dias = (date - sla) / 86400000;
            const anos = dias / 365;
            aluno.Idade = Math.round(anos);

            return aluno;
        });

        res.render('../views/index.ejs', { salas, salaSelecionada, alunos, id, frase:'', alunoIns: false, salaIns: false  });
    }
}
