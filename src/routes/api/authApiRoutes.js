const express = require("express");
const router = express.Router();

const {
  registrarAdminApi
} = require("../../controllers/api/authApiController");

// Crear administrador
router.post("/crear", registrarAdminApi);

module.exports = router;