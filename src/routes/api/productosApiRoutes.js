const express = require("express");
const router = express.Router();
const validarProducto = require("../../middlewares/validarProducto");

const {
  listarProductosApi,
    crearProductoApi,
    obtenerProductoApi,
    editarProductoApi,
    eliminarProductoApi,
    activarProductoApi
} = require("../../controllers/api/productosApiController");

router.get("/", listarProductosApi);
router.post("/", validarProducto, crearProductoApi);
router.get("/:id", obtenerProductoApi);
router.post("/editar/:id", validarProducto, editarProductoApi);
router.post("/eliminar/:id", eliminarProductoApi);
router.post("/activar/:id", activarProductoApi);


module.exports = router;