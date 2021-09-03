const fomularioContacto = document.querySelector("#form-contacto")
const botonMail = document.querySelector("#enviar-mail")

function manejarSubmit(e) {
    e.preventDefault()
    const form = new FormData(this)
    botonMail.setAttribute("href", `mailto:matias.gelpi@hotmail.com?subject=${form.get("nombre")} ${form.get("mail")}&body=${form.get("mensaje")}`)
    botonMail.click()
}

fomularioContacto.addEventListener("submit", manejarSubmit)
