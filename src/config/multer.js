// importando o multer
const multer = require('multer');

// config armazenamento
const multerConfig = multer.diskStorage ({

    //criando destino armazenamento
    destination: (req, file, cb) => {
        cb(null, 'public/img');
    },

    //Renomear arquivo
    filename: (req, file, cb) => {
        const fileName = `${new Date().getTime()} - ${file.originalname}`;

        cb(null, fileName);
    }
});


module.exports = {storage:multerConfig};