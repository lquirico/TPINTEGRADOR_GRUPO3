const express = require("express");
const router = express.Router();

const {
  mostrarCatalogo
} = require("../../controllers/cliente/catalogoController");
const Producto = require("../../models/Producto");

// Mostrar catálogo para clientes
router.get("/catalogo", mostrarCatalogo);


//=======================
//SELECCIÓN DE CATEGORÍA
//=======================
router.get("/categorias", (req, res)=> {
  res.render("cliente/seleccionarCategoria");
});


//================================
// MOSTRAR SELECCIÓN DE CATEGORÍA
//=================================
//pagina intermedia para que el cliente elija a que categoría ir
//url final: /productos/categorias

router.get("/categorias", (req, res) => {
    res.render("cliente/seleccionasCategoria");
});


module.exports = router;