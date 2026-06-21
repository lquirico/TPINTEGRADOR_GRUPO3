const express = require("express");
const router = express.Router();

//Mostrar la vista del carrito para clientes
router.get("/", (req, res) => {
    res.render("cliente/carrito"); 

});

module.exports = router;