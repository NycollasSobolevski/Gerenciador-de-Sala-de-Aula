const sala = require('../model/sala');

module.exports = {
    async pagInicialGet(req, res) {

        const salas = await sala.findAll({
            raw: true,  // Retorna somente os valores de uma tabela, sem metadados
            atributes: ['IDSala', 'Nome']
        });

        // renderizando as salas para o front
        res.render('../views/index.ejs', { salas });
    }
}
