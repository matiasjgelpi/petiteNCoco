
const manejarCarrito = (arrayArticulos) => {
//clase y variables globales

let articulos = arrayArticulos
let contadorCarrito = 0;
let carrito = [];


let sutotalSinIva = 0;
let subtotalConIva = 0;
let costoDeEnvio = 0;
let totalConEnvio = 0;

// Funciones

const botonAgregarAlCarrito = () => {
    verificarCarritoVacio(carrito)
    $(".btnAgregarAlCarrito").each(function () {

        $(this).click((e) => {
            e.preventDefault()
            agregarEliminarDelCarrito(this, "agregar")
        })
    });
}

const botonEliminarDelCarrito = () => {

    $(".btnEliminar").each(function () {

        $(this).click((e) => {
            e.preventDefault()
            agregarEliminarDelCarrito(this, "eliminar", e)
        })
    });
}


const botonFinalizarCompra = () => {
    $("#realizar-pedido").click((e) => {
        e.preventDefault()
        let opcionDePago = parseInt($("#forma-de-pago").val())
        verificarFormaDePago(opcionDePago, 0, "Seleccione una forma de pago por favor")
        let cuotas = parseInt($("#cuotas").val())
        ingresoDatos(opcionDePago, cuotas)
    })
}

const botonVaciarCarrito = () => {
    $("#vaciar-carrito").click((e) => {
        e.preventDefault()
        vaciarCarrito()
    })
}



const agregarEliminarDelCarrito = (boton, accion, event) => {
    let valorBoton = parseInt($(boton).val())
    let articuloAProcesar = articulos.find(art => art.id === valorBoton)

    if (accion == "agregar" && carrito.includes(articuloAProcesar) == true) {
        accion = "modificarCantidad"
    }



    switch (accion) {
        case "agregar":
            carrito.push(articuloAProcesar)
            alerta("Item agregado al carrito", "link")
            mostrarArticulosEnElCarrito(articuloAProcesar)
            break;

        case "modificarCantidad":
            carrito.find(art => art.id = articuloAProcesar.id).cantidad += 1
            $(`#producto${articuloAProcesar.id} .cantidad`).val(articuloAProcesar.cantidad)
            break;

        case "eliminar":
            articuloAProcesar.cantidad = 1
            event.target.closest(`#producto${valorBoton}`).remove()
            carrito = carrito.filter(function (art) {return art.id != valorBoton})
            break;
    }
    modificarVista()
    verificarCarritoVacio(carrito)
    botonEliminarDelCarrito()
    cambiarCantidadProductoInput(articuloAProcesar)


}


const vaciarCarrito = () => {

    if(carrito.length > 0){
        
        if (confirm("¿Vaciar carrito?")) {
           carrito.forEach(art => art.cantidad = 1)
           carrito = []
           $("#articulos").empty()
           $("#resumen").empty()
           modificarVista()
           verificarCarritoVacio(carrito)}
           
    }else {
        alert("Carrito vacío")
    }
}

const ingresoDatos = (opcionPago, cuotas) => {

    switch (opcionPago) {
        case 1:
            resumenCompra(opcionPago)
            $("#aviso").empty("");
            break;
        case 2:
            resumenCompra(opcionPago, cuotas)
            $("#aviso").empty("");
            break;
        case 3:
            resumenCompra(opcionPago)
            $("#aviso").empty("");
            break;
    }

}

const verificarCarritoVacio = (array) => {

    if (array.length > 0) {
        $("#carrito-vacio").text("")
    } else {
        $("#tabla-articulos").css("display", "none")
        $("#formulario-carrito").css("display", "none")
        $("#realizar-pedido").css("display", "none")
        $("#carrito-vacio").text("El carrito está vacío")
    }

}




const alerta = (mensaje, tipo) => {

    $('.navbar').append('<div class="alert float-right align-top alert-' + tipo + ' alert-dismissible" role="alert">' + mensaje + '</div>')

    $(".alert").fadeOut(500)
}


const mostrarContadorCarrito = (contador) => {
    if (contador == 0) {

        $("#link-carrito").empty()
            .append(`Carrito`)
    } else {
        $("#link-carrito").empty()
            .append(`Carrito(${contador})`)
    }
}


const cambiarCantidadProductoInput = (productoAModificar) => {

    $(`#producto${productoAModificar.id} .cantidad`).click(() => {
        let nuevaCantidad = parseInt($(`#producto${productoAModificar.id} .cantidad`).val())
        carrito.find(art => productoAModificar.id === art.id).cantidad = nuevaCantidad
        modificarVista()
    })

}


const actualizarContador = (array) => {
    let contadorAux = 0

    array.forEach((art) => {
        contadorAux += art.cantidad
    })

    return contadorAux

}

const modificarVista = () => {
    resumirCarrito(carrito)
    mostrarTotales()
    contadorCarrito = actualizarContador(carrito)
    mostrarContadorCarrito(contadorCarrito)
}


const resumirCarrito = (array) => {
    sutotalSinIva = 0;
    subtotalConIva = 0;
    costoDeEnvio = 0;
    totalConEnvio = 0;


    array.forEach(element => {
        sutotalSinIva += (element.precio * element.cantidad)
        costoDeEnvio += 200
    })

    subtotalConIva = sutotalSinIva * 1.21
    totalConEnvio = subtotalConIva + costoDeEnvio


}


const verificarFormaDePago = (value, valorAVerificar, mensaje) => {

    if (value === valorAVerificar) {
        $("#aviso").append(`<p><bold>${mensaje}</bold></p>`)
    }
}

const guardarResumenEnElStorage = () => {

    let resumenCompra = {subtotal: subtotalConIva, envio: costoDeEnvio, total: totalConEnvio}

    sessionStorage.setItem("RESUMEN-COMPRA", JSON.stringify(resumenCompra))
}

const resumenCompra = (formaDePago, cuotas) => {

    $("#resumen").empty()

    switch (formaDePago) {
        case 1:

            $("#resumen").append(`<section>
                                     <p><b>Compra finalizada con exito!</b></p>  
                                     <p>Forma de pago: Efectivo</p>
                                     <p>Deberías abonar: ${totalConEnvio - ((totalConEnvio * 10) / 100)}</p>
                                      </section>`)
            break;
        case 2:

            $("#resumen").append(`<section>
                                     <p><b>Compra finalizada con exito!</b></p>    
                                     <p>Forma de pago: Tarjeta</p>
                                     <p>Deberías abonar: ${totalConEnvio}</p>
                                     <p>${totalConEnvio/cuotas} por cuota</p>
                                      </section>`)
            break;
        case 3:

            $("#resumen").append(`<section>
                                     <p><b>Compra finalizada con exito!</b></p> 
                                     <p>Forma de pago: Mercado Pago</p>
                                     <p>Deberías abonar: ${totalConEnvio}</p>
                                      </section>`)
            break;
    }

    guardarResumenEnElStorage()
}



const mostrarArticulosEnElCarrito = (element) => {
    $("#tabla-articulos").css("display", "block")
    $("#formulario-carrito").css("display", "block")
    $("#realizar-pedido").css("display", "block")



    $("#articulos").append(`<tr id="producto${element.id}" class="text-center">
                                <td><img  width="50" height="50" src=${element.imagen} alt=""></td>
                                <td><input class="text-center cantidad" type="number" value="1" min="1" max="20"></td>
                                <td>${element.nombre}</td>
                                <td>${element.precio}</td>
                                <td><button class="btnEliminar btn btn-secondary" value="${element.id}">x</button></td>
                            </tr>`)

    ;

    mostrarCuotas()
}


const mostrarTotales = () => {
    $("#totales").empty("")
    $("#totales").append(` <tr>
        <th scope="row">Subtotal(S/IVA)</th>
        <td></td>
        <td id="subTotal">${sutotalSinIva}</td>
        </tr>
        <tr>
        <th scope="row">Con IVA</th>
        <td></td>
        <td id="iva">${subtotalConIva}</td>
        </tr>
        <tr>
        <th scope="row">Costo de envío</th>
        <td></td>
        <td id="envio">${costoDeEnvio}</td>
        </tr>
        <tr>
        <th scope="row">Total</th>
        <td></td>
        <td id="total">${totalConEnvio}</td>
        </tr>`)



}


const mostrarCuotas = () => {
    $("#forma-de-pago").change(() => {
        if ($("#forma-de-pago").val() == 2) {
            $("#div-cuotas").css("display", "block")
        } else if ($("#forma-de-pago").val() !== 2) {
            $("#div-cuotas").css("display", "none")
        }
    })
}



botonAgregarAlCarrito()
botonVaciarCarrito()
botonFinalizarCompra()

}


