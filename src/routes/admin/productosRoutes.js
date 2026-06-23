// importar express y crear un router para manejar las rutas relacionadas
// con productos
const express = require("express");
const router = express.Router();
const verificarLogin = require("../../middlewares/authMiddleware");
const upload = require("../../middlewares/upload");
const validarProducto = require("../../middlewares/validarProducto");


const {
  listarProductos,
  mostrarFormularioNuevo,
  crearProducto,
  mostrarFormularioEditar,
  editarProducto,
  eliminarProducto,
  activarProducto,
} = require("../../controllers/admin/productosController");

const { mostrarVentas } = require("../../controllers/admin/ventasController");

// Listar productos activos
console.log("listarProductos", typeof listarProductos);
router.get("/", verificarLogin, listarProductos);

//--------------------------------------------------------------------------------------------------------
// Ruta para mostrar el formulario de nuevo producto
console.log("verificarLogin:", typeof verificarLogin);
console.log("mostrarVentas:", typeof mostrarVentas);
router.get("/ventas", verificarLogin, mostrarVentas);


//--------------------------------------------------------------------------------------------------------
// Ruta para mostrar el formulario de nuevo producto
console.log("mostrarFormularioNuevo", typeof mostrarFormularioNuevo);
router.get("/nuevo", verificarLogin,  mostrarFormularioNuevo);

//--------------------------------------------------------------------------------------------------------
// Ruta para manejar el envio del formulario de nuevo producto
console.log("crearProducto", typeof crearProducto);
router.post("/nuevo", verificarLogin, upload.single("imagen"), validarProducto, crearProducto);

//--------------------------------------------------------------------------------------------------------
// Ruta para mostrar el formulario de edicion de un producto con su debida informacion
console.log("mostrarFormularioEditar", typeof mostrarFormularioEditar);
router.get("/editar/:id", verificarLogin, mostrarFormularioEditar);

//--------------------------------------------------------------------------------------------------------
// Ruta para manejar el envio del formulario de edicion de un producto y guardar los cambios realizados
console.log("editarProducto", typeof editarProducto);
router.post("/editar/:id", upload.single("imagen"), verificarLogin, validarProducto, editarProducto);

//--------------------------------------------------------------------------------------------------------
// Ruta para eliminar un producto (en realidad lo que hace es marcarlo como inactivo para no mostrarlo en la lista de productos)
console.log("eliminarProducto", typeof eliminarProducto);
router.post("/eliminar/:id", verificarLogin, eliminarProducto);


//--------------------------------------------------------------------------------------------------------
// Ruta para activar un producto (lo que hace es marcarlo como activo para mostrarlo nuevamente en la lista de productos)
console.log("activarProducto", typeof activarProducto);
router.post("/activar/:id", verificarLogin, activarProducto);







module.exports = router;




