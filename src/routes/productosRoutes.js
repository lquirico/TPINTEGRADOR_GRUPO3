// importar express y crear un router para manejar las rutas relacionadas
// con productos
const express = require("express");
const router = express.Router();
const verificarLogin = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");


const {
  listarProductos,
  mostrarFormularioNuevo,
  crearProducto,
  mostrarFormularioEditar,
  editarProducto,
  eliminarProducto,
  activarProducto
} = require("../controllers/productosController");


// Listar productos activos
router.get("/", verificarLogin, listarProductos);

//--------------------------------------------------------------------------------------------------------
// Ruta para mostrar el formulario de nuevo producto
router.get("/nuevo", verificarLogin,  mostrarFormularioNuevo);

//--------------------------------------------------------------------------------------------------------
// Ruta para manejar el envio del formulario de nuevo producto
router.post("/nuevo", verificarLogin, upload.single("imagen"), crearProducto);

//--------------------------------------------------------------------------------------------------------
// Ruta para mostrar el formulario de edicion de un producto con su debida informacion
router.get("/editar/:id", verificarLogin, mostrarFormularioEditar);

//--------------------------------------------------------------------------------------------------------
// Ruta para manejar el envio del formulario de edicion de un producto y guardar los cambios realizados
router.post("/editar/:id", upload.single("imagen"), verificarLogin, editarProducto);

//--------------------------------------------------------------------------------------------------------
// Ruta para eliminar un producto (en realidad lo que hace es marcarlo como inactivo para no mostrarlo en la lista de productos)
router.post("/eliminar/:id", verificarLogin, eliminarProducto);


router.post("/activar/:id", verificarLogin, activarProducto);




//--------------------------------------------------------------------------------------------------------
//Ruta para probar  catalogo de productos (no es necesario, solo para pruebas)
//La ruta recibe el nombre que el cliente ingresa en el form de bienvenida 
  router.post("/catalogo", (req, res) => { 
    const nombreCliente = req.body.nombreCliente; // Obtener el nombre del cliente desde el formulario de bienvenida desde el campo "name= 'nombreCliente'" en el form.


    const productos = [
    {
      id: 1,
      nombre: "Harry Potter",
      descripcion: "Un joven mago descubre su destino en un mundo mágico lleno de aventuras y peligros.",
      precio: 15000,
      imagen: "https://picsum.photos/300/400",
      categoria: "libro",
      genero: "fantasia",
      activo: true
      
    },
    {
      id: 2,
      nombre: "Interstellar",
      descripcion: "Un grupo de astronautas viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.",
      precio: 12000,
      imagen: "https://picsum.photos/300/401",
      categoria: "pelicula",
      genero: "ciencia ficcion",
      activo: true
      
      
      
    },
    {
      id: 3,
      nombre: "Scary Movie",
      descripcion: "Una parodia de las películas de terror más famosas, llena de humor absurdo y situaciones ridículas.",
      precio: 8000,
      imagen: "https://picsum.photos/300/402",
      categoria: "pelicula",
      genero: "comedia",
      activo: true
    },
    {
      id: 4,
      nombre: "El Señor de los Anillos",
      descripcion: "Un hobbit emprende una peligrosa misión para destruir un anillo malvado que amenaza con dominar el mundo.",
      precio: 20000,
      imagen: "https://picsum.photos/300/403",
      categoria: "libro",
      genero: "fantasia",
      activo: true
    }
  ];

  res.render("catalogoProductos", {
    productos,
    nombreCliente
  });


});



module.exports = router;




