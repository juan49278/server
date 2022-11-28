let email = localStorage.getItem('email')
let primerNombreLocal = localStorage.getItem('primerNombre')
let segundoNombreLocal = localStorage.getItem("segundoNombre")
let primerApellidoLocal = localStorage.getItem("primerApellido")
let segundoApellidoLocal = localStorage.getItem("segundoApellido")
let telefonoLocal = localStorage.getItem("telefono")


addEventListener('DOMContentLoaded', () => {
    localStorage.setItem("imageDefault", "img/img_perfil.png")
    if (!localStorage.getItem('imageProfile')) {
        imgNew.src = localStorage.getItem('imageDefault')
    } else {
        imgNew.src = localStorage.getItem('imageProfile')
    }
    document.getElementById('email').value = email
    if (primerNombreLocal != "") {
        primerNombre.value = primerNombreLocal
    } else {
        primerNombre.value = ""
    } if (segundoNombreLocal != "") {
        segundoNombre.value = segundoNombreLocal
    } else {
        segundoNombre = ""
    } if (primerApellidoLocal != "") {
        primerApellido.value = primerApellidoLocal
    } else {
        primerApellido = ""
    } if (segundoApellidoLocal != "") {
        segundoApellido.value = segundoApellidoLocal
    } else {
        segundoApellido.value = ""
    } if (telefonoLocal != "") {
        telefono.value = telefonoLocal
    } else {
        telefono.value = ""
    }
})
function nombre() {
    let primerNombre = document.getElementById('primerNombre').value
    primerNombre = localStorage.setItem("primerNombre", primerNombre)
}

function apellido() {
    let primerApellido = document.getElementById('primerApellido').value
    primerApellido = localStorage.setItem('primerApellido', primerApellido)
}
function telephone() {
    let telefono = document.getElementById('telefono').value
    telefono = localStorage.setItem('telefono', telefono)
}
function nombre2() {
    let segundoNombre = document.getElementById('segundoNombre').value
    segundoNombre = localStorage.setItem('segundoNombre', segundoNombre)
}
function apellido2() {
    let segundoApellido = document.getElementById('segundoApellido').value
    segundoApellido = localStorage.setItem('segundoApellido', segundoApellido)
}
function check() {
    input = document.querySelectorAll('input[name=profile]').forEach(input => {
        if (input.value != "") {
            input.classList.remove('is-invalid')
        } else {
            input.classList.add('is-invalid')
        }
    })
}
function alertSuccess() {
    if ((primerNombre.value != "") && (primerApellido.value != "") && (telefono.value != "")) {
        Swal.fire({
            title: 'Listo!',
            text: 'Los datos se actualizaron correctamente',
            icon: 'success'
        })
    }
}

document.querySelector('#imageUpload').addEventListener('change', function () {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        localStorage.setItem('imageProfile', reader.result)
    })
    reader.readAsDataURL(this.files[0])
    window.location.reload()
})

btnDelete.addEventListener('click', () => {
    localStorage.removeItem('imageProfile')
    window.location.reload()
})
if (imgNew.src = localStorage.getItem('imageProfile')) {
    btnDelete.classList.remove('disabled')
} else {
    btnDelete.classList.add('disabled')
}

const swal = require('sweetalert2');
