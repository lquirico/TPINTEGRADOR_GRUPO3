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

                <p class="mb-1">
                    Cantidad: 
                    <strong>${producto.cantidad}</strong>
                </p>        
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
}


//===============================
// INICIAR LA VISTA DEL CARRITO
//==============================

mostrarCarrito(); //lo primero que se ejecuta cuando carga la página para mostrar el contenido del carrito
                  // si el carrito está vacío, se muestra una card amarilla de boostrap con el mensaje que indica que no hay productos.













