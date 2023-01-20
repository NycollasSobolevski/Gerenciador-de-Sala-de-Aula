// importando tabelas 

const sala = require("../model/sala");
const aluno = require('../model/aluno');

module.exports = {
    async sala(req, res){
        res.render('../views/index')
    },

    async openInsertSala(req, res){
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

        res.render('../views/index', { alunos, salas, id:'', frase:'', alunoIns: false, salaIns: true })
    },

    async openInsertAluno(req, res){
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

        res.render('../views/index', { alunos, salas, id:'', frase:'', alunoIns: true, salaIns: false  })
    },

    async salaInsert(req, res){
        // recebe as info do front
        const dados = req.body;
        // Criando a Sala no DB
        await sala.create({
            Nome: dados.nome,
            Capacidade: dados.capacidade,
            IdadeMinima: dados.idadeMinima,
            IdadeMaxima: dados.idadeMaxima
        });

        // Redirecionar para a pagina principal
        res.redirect('/');
    },

    async aluno(req, res){
    
        const idSelectSala = req.body.salaSelect;
        
        // Encontrando salas no DB
        const salas = await sala.findAll({
            raw: true,  // Retorna somente os valores de uma tabela, sem metadados
            atributes: ['IDSala','Nome']
        });
        // Enviando todos os alunos
        const alunosNaSala = await aluno.findAll({
            raw:true, 
            atributes: ['IDAluno', 'Nome', 'Nascimento', 'Sexo', 'Foto', 'IDSala'],
            where: {IDSala: idSelectSala}
        })

        // renderizando as salas para o front
        res.render('../views/index.ejs', {salas, alunosNaSala});
    },

    async alunoInsert(req, res){
        const dados = req.body;
        const idSala = req.body.salaSelect;

        const salaSelecionada = await sala.findAll({
            raw: true,
            atributes:['IDSala', 'Nome', 'Capacidade','IdadeMinima','IdadeMaxima'],
            
        },{
            where:{IDSala: idSala}
        });

        let foto = 'profile_avatar.jpg';


        if (req.file) {
            foto = req.file.filename;
        }

        let diaAtual = new Date();
        let nascimento = new Date(dados.nascimento);
        let dias = (diaAtual - nascimento ) / 86400000;
        let anos = dias / 365;
        if(anos > salaSelecionada[0].IdadeMinima && anos < salaSelecionada[0].IdadeMaxima){
            console.log('entrou');
            await aluno.create({
                Nome: dados.nome,
                Nascimento: dados.nascimento,
                Sexo: dados.sexo,
                IDSala: dados.salaSelect,
                Foto: foto
            });
            
            res.redirect('/');
        }

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

        
        res.render('../views/index', { alunos, salas, id:'', frase:'Idade incompatível com o curso selecionado', alunoIns: false , salaIns: false })
    }
}


