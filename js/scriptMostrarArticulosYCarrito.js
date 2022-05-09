$(document).ready(function () {
  let articulos = [];

  $.ajax({
    type: "GET",
    url: "https://apimocha.com/petite/products",
    dataType: "json",

    success: (res) => {
      articulos = res;
      mostrarArticulos(articulos);
      manejarCarrito(articulos);
    },

    error: (error) => {
      alert("no se obtuvieron los articulos");
      console.log(error);
    },
  });

  const mostrarArticulos = (arrayArticulos) => {
    arrayArticulos.forEach((art) => {
      $("#mostrar-productos").append(`
                                    <div class="col-md-6 col-lg-4 col-12 item-articulo">
                                        <img class="imagen-articulo" src=${art.imagen} alt="">
                                        <p>${art.descripcion}<span class="precio">Precio ${art.precio}</span></p>
                                        <button id="agregar-al-carrito-${art.id}" class="btnAgregarAlCarrito btn btn-light col-12" value="${art.id}">Agregar al carrito</button>
                                    </div>
                                  `);
    });
  };

  const mostrarModalCarrito = () => {
    $("#modal").append(`
                       <div class="modal fade" id="cart" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
                          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="">Carrito</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                                 </div>
                                   <div class="modal-body">
                                     <p id="carrito-vacio" class="row d-flex justify-content-center"> El carrito está vacío </p>

                                      <div class="row justify-content-center"> 
                                         <div class="col-auto" id="div-tabla">
                                           <table class="table table-borderless table-responsive" id="tabla-articulos">
                                             <thead class="thead-light">
                                             <tr>
                                               <th></th>
                                               <th>Cantidad</th>
                                               <th>Nombre</th>
                                               <th>Precio</th>
                                               <th></th>
                                             </tr>
                                             </thead>
                                             <tbody id="articulos"></tbody>
                                             <tfoot id="totales"></tfoot>
                                           </table>
                                          </div>
                                       </div>

                                      <div class=" row d-flex justify-content-center">
                                       <form id="formulario-carrito">

                                         <div class="row d-flex justify-content-center">
                                             <select class="" name="forma-de-pago" id="forma-de-pago">
                                               <option value="0">Forma de pago</option>
                                               <option value="1">Efectivo (10% de descuento)</option>
                                               <option value="2">Tarjeta</option>
                                               <option value="3">Billetera digital</option>
                                             </select>
                                          </div>


                                           <div class="" id="div-cuotas">
                                              <label for="cuotas">Cuotas</label>
                                               <select name="cuotas" id="cuotas">
                                                 <option value="1">1</option>
                                                 <option value="2">2</option>
                                                 <option value="3">3</option>
                                                 <option value="4">4</option>
                                                 <option value="5">5</option>
                                                 <option value="6">6</option>
                                               </select>
                                            </div>


                                                <p id="aviso" class=""><bold>*Costo de envío $200 por artículo</bold></p>
                                         </form>

                                      </div>
                                      
                                      <div id="resumen" class="resumen row d-flex justify-content-center "></div>
                                </div>
                                       <div class="modal-footer">
                                          <button type="button" class="btn btn-secondary" id="vaciar-carrito">Vaciar Carrito</button>
                                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                          <button type="button" class="btn btn-secondary" id="realizar-pedido">Finalizar Compra</button>
                                       </div>
                             </div>
                           </div>
                        </div> `);
  };

  mostrarModalCarrito();
});
