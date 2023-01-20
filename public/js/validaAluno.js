
function validaData() {
    let data = document.getElementById("dataNasc").value;
    let sala = document.getElementById('Sala-cadastro').value;
    console.log(sala.IDSala)
    let sla;
    salas.forEach(element => {
        if (element.IDSala == sala) {
            sla = element;
        }
    });

    let diaAtual = new Date();
    let nascimento = new Date(data);
    let dias = (diaAtual - nascimento ) / 86400000;
    let anos = dias / 365;

    console.log(sla);

    console.log(Math.round(anos));
}

// const validaData = (salas) => {
//     let data = document.getElementById("dataNasc").value;
//     let sala = document.getElementById('Sala-cadastro').value;
//     let sla;
//     salas.forEach(element => {
//         if (element.IDSala == sala) {
//             sla = element;
//         }
//     });

//     let diaAtual = new Date();
//     let nascimento = new Date(data);
//     let dias = (diaAtual - nascimento ) / 86400000;
//     let anos = dias / 365;

//     console.log(sla);

//     console.log(Math.round(anos));
// }