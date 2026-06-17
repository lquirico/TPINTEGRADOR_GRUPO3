const express = require("express");
const router = express.Router();

const {
  mostrarLogin,
  login,
  logout,
  mostrarRegistro,
  registrar
} = require("../../controllers/admin/authController");

//--------------------------------------------------------------------------------------------------------
//Ruta para mostrar el formulario de login
router.get("/login", mostrarLogin);

//--------------------------------------------------------------------------------------------------------
//Ruta para manejar el envio del formulario de login y autenticar al usuario
router.post("/login", login);

//--------------------------------------------------------------------------------------------------------
//Ruta para cerrar sesión
router.get("/logout", logout);

//--------------------------------------------------------------------------------------------------------
//Ruta para mostrar el formulario de registro de nuevo usuario
router.get("/registro", mostrarRegistro);

//--------------------------------------------------------------------------------------------------------
//Ruta para manejar el envio del formulario de registro de nuevo usuario y crear la cuenta
router.post("/registro", registrar);

module.exports = router;