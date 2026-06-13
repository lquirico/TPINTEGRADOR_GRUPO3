const express = require("express");
const router = express.Router();

const {
  mostrarLogin,
  login,
  logout
} = require("../controllers/authController");

//--------------------------------------------------------------------------------------------------------
//Ruta para mostrar el formulario de login
router.get("/login", mostrarLogin);

//--------------------------------------------------------------------------------------------------------
//Ruta para manejar el envio del formulario de login y autenticar al usuario
router.post("/login", login);

//--------------------------------------------------------------------------------------------------------
//Ruta para cerrar sesión
router.get("/logout", logout);

module.exports = router;