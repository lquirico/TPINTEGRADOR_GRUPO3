const express = require("express");
const router = express.Router();

const { listarVentasApi } = require("../../controllers/api/listadoApiVentasController");


console.log("listarVentasApi:", typeof listarVentasApi);
router.get("/", listarVentasApi);

module.exports = router;