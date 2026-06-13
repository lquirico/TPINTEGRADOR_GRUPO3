// Aca uso express-session para manejar las sesiones de los usuarios.
// Esto es un middleware que se encarga de verificar si el usuario esta logueado o no. 
// Si no lo esta, lo redirige a la pagina de login.
function verificarLogin(req, res, next) {

  if (!req.session.usuario) {
    return res.redirect("/login");
  }

  next();

}

module.exports = verificarLogin;