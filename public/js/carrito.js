//========================= CARRITO DE COMPRAS ===========================

console.log("carrito.js cargado correctamente");


//Este código se va a ejecutar del lado del cliente (navegador)
//No utiliza MySql ni Express
//Toda la información se almacena en el LocalStorage



//OBTENER TODOS LOS BOTONES DE "Agregar al carrito"
//"querySelectorAll va a devolver una lista con todos los elementos que tengan la clase indicada, 
//en este caso, los botones "Agregar al carrito"

const botonesAgregar = document.querySelectorAll(".btnAgregarCarrito");


//RECORRER TODOS LOS BOTONES AGREGADOS
//El forEach ejecuta el código una vez por cada botón
botonesAgregar.forEach(boton => { 
    boton.addEventListener("click", () => { //Escucha el click del botón
       

        const producto={        //Crea un objeto Producto utilizando la información almacenada
                                //en los atributos "data-*" del botón.
            id: Number(boton.dataset.id),
            nombre: boton.dataset.nombre,
            precio: Number(boton.dataset.precio),
            imagen: boton.dataset.imagen,
            categoria: boton.dataset.categoria,
            genero: boton.dataset.genero,
            cantidad: 1
        };

        agregarAlCarrito(producto); //llama a la función que agrega el producto al carrito
    });
});



//AGREGAR AL CARRITO

function agregarAlCarrito(producto){
    let carrito =
        JSON.parse(localStorage.getItem("carrito")) || []; //Obtiene el carrito almacenado
                                                          // si el carrito no existe, crea uno vacío.
    
    const productoExistente = carrito.find(item => item.id === producto.id); //busca si el producto fue agregado anteriormente.

    //si el producto ya existe en el carrito:
    if(productoExistente){
        productoExistente.cantidad++;
    }
    //si el producto NO existe en el carrito:
    else{
        carrito.push(producto);
    }


    //Guarda de nuevo el carrito
    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito), //stringify convierte el objeto en texto ya que el localStorage solo almacena texto.
        mostrarMensajeCarrito()
    );
    actualizarContadorCarrito();
    
    
    

}

//====================================
// ACTUALIZAR CONTADOR DE CARRITO
//====================================

//Muestra en el navbar la cantidad total de productos que se agregan al carrito.

function actualizarContadorCarrito(){
    const contador=
        document.getElementById("contadorCarrito");

        if(!contador){
            return;
        }
        const carrito =
            JSON.parse(localStorage.getItem("carrito")) || [];

        let cantidadTotal= 0;

        carrito.forEach(producto => {
            cantidadTotal+= producto.cantidad;
        });
        contador.textContent = cantidadTotal;
}

actualizarContadorCarrito(); // cuando abre el catálogo carga directammente la cantidad actual


//========================================
//MENSAJE DE PRODUCTO AGREGADO AL CARRITO
//========================================

function mostrarMensajeCarrito(){
    const mensaje = document.getElementById("mensajeCarrito");

    if(!mensaje){
        return;
    }

    //mostrar alerta
    mensaje.classList.remove("d-none");

    //ocultar alerta despues de 3 segundos
    setTimeout(() =>{
        mensaje.classList.add("d-none");
    }, 3000);
}