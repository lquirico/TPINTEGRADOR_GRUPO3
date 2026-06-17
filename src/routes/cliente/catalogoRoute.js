const express = require("express");
const router = express.Router();

const {
  mostrarCatalogo
} = require("../../controllers/cliente/catalogoController");

// Mostrar catálogo para clientes
router.get("/catalogo", mostrarCatalogo);

module.exports = router;