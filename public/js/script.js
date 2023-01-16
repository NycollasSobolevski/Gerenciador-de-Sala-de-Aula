function AbrirCadastro(id) {
    CleanScreen()
    document.getElementById(id).style.display = 'flex'
    var elemento = document.getElementById(id)
    if(elemento.style.display == 'none') {
        document.getElementById('Sala').classList.remove('Blur')
    }
    if(elemento.style.display == 'flex') {
        document.getElementById('Sala').classList.add('Blur')
    }
}
function FecharCadastro(id) {
    document.getElementById(id).style.display = 'none'
    CleanScreen()
}
function CleanScreen() {
    document.getElementById('CadastroAluno').style.display = 'none'
    document.getElementById('CadastroSala').style.display = 'none'
    document.getElementById('Sala').classList.remove('Blur');
}


let photo = document.getElementById('ProfileAvatar');
let file  = document.getElementById('flImage');

photo.addEventListener('click', () =>{
    file.click();
});

    file.addEventListener('change',() => {
        if(file.files.lenght == 0)
        {
            return;
        }

        let reader = new FileReader();

        reader.readAsDataURL(file.files[0]);

        reader.onload = () => {
            photo.src = reader.result
        }
    })


    function ViewValue(id) {
        idElement = document.getElementById(id)
        console.log(idElement.value);
    }