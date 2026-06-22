//============================
// CONFIRMACIÓN DE COMPRA
//============================


//Lee el carrito del localStorage
//y muestra un resumen antes de confirmar la compra

const carrito= JSON.parse(localStorage.getItem("carrito")) || [];

const resumenCompra = document.getElementById("resumenCompra");

function mostrarResumenCompra(){
    if(carrito.length === 0){
        resumenCompra.innerHTML= `
            <div class= "alert alert-warning">
                No hay productos en el carrito.
            </div>
        `;
        return;
    }

    let total = 0;

    let html = `
        <h4 class= "mb-3">Resumen de compra</h4>
        <ul class= "list-group mb-3">
    `;

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        html += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>${producto.nombre}</strong><br>
                    <small>
                        Cantidad: ${producto.cantidad} | Precio: $${producto.precio}
                    </small>
               </div>
               <span>
                    $${subtotal}
               </span>

            </li>
        
        `;
    });

    html += `
        </ul>
            <h3>
                Total: $${total}
            </h3>
        
    `;
    resumenCompra.innerHTML = html;


}
mostrarResumenCompra();


//===========================
//CONFIRMAR COMPRA
//===========================

async function  confirmarCompra(){
    //se valida que el carrito tenga productos
    if(carrito.length === 0){
        alert("No hay productos en el carrito.");
        return;
    }

    let total = 0;
    //se calcula el total 
    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
    });


    //se preparan los datos de la compra
    const datosCompra = {
        cliente_nombre: localStorage.getItem("nombreCliente") || "Cliente",
        carrito: carrito,
        total: total
    };
    console.log("Botón confirmar presionado");
    console.log("Datos enviados: ", datosCompra);
    //se envian los datos al backend usando "fetch()"
    const respuesta = await fetch("/carrito/confirmar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datosCompra)
    });

    //si la venta se guarda correctamente, se vacía el localStorage
    const resultado = await respuesta.json();

    if(resultado.ok){
        localStorage.removeItem("carrito");
        alert("Compra registrada correctamente.");

        window.location.href ="/carrito";
    }
    else{
        alert("No se pudo registrar la compra.");
    }
}