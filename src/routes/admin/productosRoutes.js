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
  activarProducto
} = require("../../controllers/admin/productosController");


// Listar productos activos
router.get("/", verificarLogin, listarProductos);

//--------------------------------------------------------------------------------------------------------
// Ruta para mostrar el formulario de nuevo producto
router.get("/nuevo", verificarLogin,  mostrarFormularioNuevo);

//--------------------------------------------------------------------------------------------------------
// Ruta para manejar el envio del formulario de nuevo producto
router.post("/nuevo", verificarLogin, upload.single("imagen"), validarProducto, crearProducto);

//--------------------------------------------------------------------------------------------------------
// Ruta para mostrar el formulario de edicion de un producto con su debida informacion
router.get("/editar/:id", verificarLogin, mostrarFormularioEditar);

//--------------------------------------------------------------------------------------------------------
// Ruta para manejar el envio del formulario de edicion de un producto y guardar los cambios realizados
router.post("/editar/:id", upload.single("imagen"), verificarLogin, validarProducto, editarProducto);

//--------------------------------------------------------------------------------------------------------
// Ruta para eliminar un producto (en realidad lo que hace es marcarlo como inactivo para no mostrarlo en la lista de productos)
router.post("/eliminar/:id", verificarLogin, eliminarProducto);


//--------------------------------------------------------------------------------------------------------
// Ruta para activar un producto (lo que hace es marcarlo como activo para mostrarlo nuevamente en la lista de productos)
router.post("/activar/:id", verificarLogin, activarProducto);







module.exports = router;




