// uso de bcrypt para encriptar contraseñas y comparar contraseñas ingresadas con las almacenadas en la base de datos
const bcrypt = require("bcrypt");

// uso de modelo UsuarioAdmin para buscar usuarios en la base de datos
const UsuarioAdmin = require("../../models/UsuarioAdmin");

// controlador para mostrar la página de login
const mostrarLogin = (req, res) => {

  res.render("bienvenida");

};

// controlador para manejar el proceso de login
const login = async (req, res) => {

  try {

    // buscar el usuario en la base de datos por su email ingresado
    const usuario = await UsuarioAdmin.findOne({
      where: {
        email: req.body.email
      }
    });

    // si el usuario no existe, envio un mensaje de error
    if (!usuario) {
      return res.send("Usuario no encontrado");
    }

    // comparo la contraseña ingresada con la contraseña almacenada en la base de datos utilizando bcrypt
    const passwordCorrecta = await bcrypt.compare(
      req.body.password,
      usuario.password
    );
    // si la contraseña es incorrecta, envio un mensaje de error
    if (!passwordCorrecta) {
      return res.send("Contraseña incorrecta");
    }
    // si el login es exitoso, almaceno la informacion del usuario en la sesion y redirijo a la pagina de productos
    req.session.usuario = {
      id: usuario.id,
      email: usuario.email
    };
    // una vez logueado redirijo a la pagina de productos  
  res.redirect("/admin/productos");

  } catch (error) {

    console.log(error);
    res.send("Error en login");

  }

};

// controlador para manejar el proceso de logout
const logout = (req, res) => {

  // destruyo la sesion del usuario para cerrar sesion y lo redirijo a la pagina de login
  req.session.destroy((error) => {

    // si hay un error al destruir la sesion, envio un mensaje de error
    if (error) {
      return res.send("Error al cerrar sesion");
    }
    // redirijo a la pagina de login despues de cerrar sesion
    res.redirect("/");

  });

};

// controlador para mostrar el formulario de registro de nuevos usuarios administradores
const mostrarRegistro = (req, res) => {
    res.render("admin/registro");

  res.render("admin/registro", {
    error: null
  });
  
};

// controlador para manejar el proceso de registro de nuevos usuarios administradores
const registrar = async (req, res) => {

  try {
    // aca obtengo los datos del formulario de registro (email, password y confirmarPassword) para validar que se hayan ingresado correctamente y luego crear un nuevo usuario administrador en la base de datos si todo es correcto
    const { email, password, confirmarPassword } = req.body;

    // valido que se hayan ingresado todos los campos necesarios (email, password y confirmarPassword) para el registro
    if (!email || !password || !confirmarPassword) {
      // si falta algun campo, envio un mensaje de error indicando que todos los campos son obligatorios
      return res.render("admin/registro", {
        error: "Todos los campos son obligatorios"
      });

    }

    // valido que las contraseñas coincidan
    if (password !== confirmarPassword) {

      return res.render("admin/registro", {
        error: "Las contraseñas no coinciden"
      });

    }

    // valido que no exista un usuario con el mismo email
    const usuarioExistente = await UsuarioAdmin.findOne({
      where: { email }
    });
    //si ya existe, envio un mensaje de error indicando que ya existe un usuario con ese email
    if (usuarioExistente) {

      return res.render("admin/registro", {
        error: "Ya existe un usuario con ese email"
      });

    }
    // si todo es correcto, encripto la contraseña utilizando bcrypt antes de almacenarla en la base de datos para mayor seguridad
    const passwordHash = await bcrypt.hash(password, 10);

    await UsuarioAdmin.create({

      email,
      password: passwordHash

    });

    // redirijo al usuario a la página de inicio después de un registro exitoso
    res.redirect("/");

  } catch (error) {

    console.log(error);

    res.render("admin/registro", {
      error: "Error al registrar usuario"
    });

  }

};


// exporto los controladores para ser utilizados en las rutas
module.exports = {
  mostrarLogin,
  mostrarRegistro,
  registrar,
  login,
  logout
};