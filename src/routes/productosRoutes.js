// importar express y crear un router para manejar las rutas relacionadas
// con productos
const express = require("express");
const router = express.Router();

// Importar el modelo de Producto
const Producto = require("../models/Producto");


// Ruta para obtener todos los productos
router.get("/", async (req, res) => {

  try {
    // Obtener todos los productos de la base de datos
    const productos = await Producto.findAll();
    // Enviar la lista de productos como respuesta en formato JSON
    res.json(productos);

  } catch (error) {

    res.status(500).json({
      error: "Error al obtener productos"
    });

  }

});


module.exports = router; // Exportar el router para que pueda ser utilizado en otros archivos, como app.js