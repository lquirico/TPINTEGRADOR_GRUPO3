//==================
//VISTA DEL CARRITO
//===================

//Lee el carrito almacenado en el localStorage 
//y muestra el contenido dentro de la página "carrito.ejs"


//OBTENER EL CARRITO ALMACENADO EN LOCALSTORAGE
const carrito = 
    JSON.parse(localStorage.getItem("carrito")) || []; //".getItem" busca información guardada en "carrito". En caso de que no exista, crea un arreglo vacío (evita errores).
                                                       //JSON.parse pasa el texto que se guarda en el localStorage a un objeto para que pueda mostrarse en la vista.
console.log(carrito);


//==================================================
// OBTENER EL CONTENDEDOR DEL CARRITO
//==================================================


const contenedorCarrito = document.getElementById("contenedorCarrito"); //va a buscar un elemento del html mediante el id.



//========================================
// MOSTRAR EL CARRITO EN PANTALLA
//========================================

//Recorre todos los productos almacenados en el localStorage y genera una card boostrap por cada uno
//Va a insertar las cards dentro del contenedor del carrito.
function mostrarCarrito(){
    //Si el carrito está vacío se muestra un mensaje que indica que todavía no se cargaron productos.
    if(carrito.length === 0){ 
        contenedorCarrito.innerHTML = `
            <div class = "alert alert-warning text-center">
                El carrito aún no tiene productos.
            </div>
        `;
        return;
    }
    //========================================
    // LIMPIAR EL CONTENEDOR
    //========================================

    //Antes de dibujar nuevamente el carrito, se elimina todo el contenido que tiene
    //Esto va a evitar productos duplicados cada vez que se ejecute la función que muestra el carrito


    contenedorCarrito.innerHTML="";

    //====================================
    // CALCULAR EL TOTAL DEL CARRITO
    //====================================

    let total = 0; //esta variable almacena el total de la compra y va a ir acumulando producto x producto mientras recorremos el carrito

    //==========================================
    // RECORRER TODOS LOS PRODUCTOS DEL CARRITO
    //==========================================

    carrito.forEach(producto => { //recorre uno x uno los productos almacenados en el array "carrito"

    //============================
    // CREAR CARD DEL PRODUCTO
    //===========================

        const columna = document.createElement("div");
        columna.className= "col-lg-7 col-md-9 mx-auto mb-3";

        const card = document.createElement("div"); //se crea un elemento <div> utilizando js.
                                                //va a contener toda la información del producto
        card.className = "card mb-3";    
        
    //===================
    // SUMAR AL TOTAL
    //===================
        
        total+= producto.precio * producto.cantidad; //multiplica el precio x la cantidad  y lo acumula en la variable "total"
        
        
    //================================
    // COMPLETAR CONTENIDO DE LA CARD
    //================================
    //"innerHTML" permite escribir código HTML en js.
        card.innerHTML = ` 
            <div class="row g-0 align-items-center">
                <div class= "col-md-4">

                <img
                    src="/uploads/${producto.imagen}" 
                    class= "img-fluid rounded-start"
                    alt="${producto.nombre}"
                    style= "height: 220px; width: 100%; object-fit:cover;"> 
        
            </div>

            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title mb-2">
                    ${producto.nombre}
                </h5>

                <p class="mb-1">
                    Categoría: 
                    <strong>${producto.categoria}</strong>
                
                </p>
                <p class="mb-1">
                    Género:
                    <strong>${producto.genero}</strong>
                </p>

                <p class="mb-1">
                    Precio: 
                    <strong>${producto.precio}</strong>
                </p>

                <div class="d-flex align-items-center gap-2 mt-2">
                    <span>Cantidad:</span>

                    <button
                        class= "btn btn-outline-danger btn-sm"
                        onclick= "disminuirCantidad(${producto.id})">
                        -
                    </button>
                    <strong>${producto.cantidad}</strong>
                    <button 
                        class="btn btn-outline-success btn-sm"
                        onclick= "aumentarCantidad(${producto.id})">
                        +
                    </button>
                
               
                </div>

                <div class="mt-3">

                    <button
                        class="btn btn-danger btn-sm"
                        onclick= "eliminarProducto(${producto.id})">

                        Eliminar 

                    </button>
               
               </div>

            </div>
        
        </div>

    </div>
    `;
    //=================================================
    // AGREGAR LA TARJETA AL CONTENEDOR
    //=================================================

    columna.appendChild(card);
    contenedorCarrito.appendChild(columna); //agrega el elemento recién creado dentro del contendor principal
                                        //esto se repite una vez x cada producto.
});

    //=============================
    // MOSTRAR TOTAL DEL CARRITO
    //=============================
    
    const resumen = document.createElement("div");

    resumen.className=
        "col-lg-7 col-md-9 mx-auto mt-4";
    resumen.innerHTML= `
        <div class = "card shadow">
            <div class= "card-body text-center">
                <h3>
                    Total: $${total}
                </h3>
            
            </div>
        
        </div>
    
    `;
    contenedorCarrito.appendChild(resumen);


}


//===============================
// INICIAR LA VISTA DEL CARRITO
//==============================

mostrarCarrito(); //lo primero que se ejecuta cuando carga la página para mostrar el contenido del carrito
                  // si el carrito está vacío, se muestra una card amarilla de boostrap con el mensaje que indica que no hay productos.


//=================================
// GUARDAR CARRITO EN LOCALSTORAGE
//=================================

//Actualiza el LocalStorage con el contenido actual del carrito
//Cada vez que se modifica una cantidad, hay que volver a guardar el arreglo.

function guardarCarrito(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}



//===============================
// AUMENTAR CANTIDAD
//===============================

function aumentarCantidad(idProducto){ //recibe el id del producto seleccionado
    const producto = carrito.find(item => item.id === idProducto); 

    if(producto){
        producto.cantidad++; //busca el producto dentro del carrito y aumenta su cantidad en 1

    }

    guardarCarrito();
    mostrarCarrito();

}

//================================
// DISMINUIR CANTIDAD
//================================

function disminuirCantidad(idProducto){ //recibe el id del producto seleccionado
    const producto = carrito.find(item => item.id === idProducto);
    
    if(producto && producto.cantidad > 1){ 

        producto.cantidad--; //si la cantidad es mayor a 1, la disminuye
                             //si la cantidad llega a 1, no baja más para evitar cantidades en 0

    }
    guardarCarrito();
    mostrarCarrito();
}


//==========================
// ELIMINAR PRODUCTO 
//==========================

//Elimina completamente un producto utilizando su id

function eliminarProducto(idProducto){
    const indiceProducto =
        carrito.findIndex(  //"findIndex" busca la posición del producto
            item => item.id === idProducto
        );
    
        if(indiceProducto !== -1){
            carrito.splice(indiceProducto, 1); //.splice elimina elementos 
        }

        guardarCarrito();
        mostrarCarrito();
}











