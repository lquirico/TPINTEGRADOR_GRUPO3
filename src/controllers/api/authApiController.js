// uso de bcrypt para encriptar contraseñas
const bcrypt = require("bcrypt");

// uso del modelo UsuarioAdmin
const UsuarioAdmin = require("../../models/UsuarioAdmin");

// API - Registrar administrador
const registrarAdminApi = async (req, res) => {

  try {

    // pido por body email y contraseña, valido que no este vacios
    
    const { email, password } = req.body;

    if (!email || !password) {

      return res.status(400).json({

        success: false,
        mensaje: "Todos los campos son obligatorios"

      });

    }
    // busco en la base de datos si ya existe un usuario con ese email, para evitar duplicados, si existe devuelvo un error
    const usuarioExistente = await UsuarioAdmin.findOne({
      where: { email }
    });

    if (usuarioExistente) {

      return res.status(400).json({

        success: false,
        mensaje: "Ya existe un usuario con ese email"

      });

    }

    // aca se encripta la contraseña antes de guardarla en la base de datos,
    // el 10 es para indicar el numero de rondas de salting (significa cuantas veces se aplica el algoritmo de hash), lo que hace que la contraseña sea mas segura
    const passwordHash = await bcrypt.hash(password, 10);

    // creo el nuevo usuario administrador en la base de datos con el email y la contraseña encriptada.
    const usuario = await UsuarioAdmin.create({

      email,
      password: passwordHash

    });
    //un 201 es el codigo de estado HTTP para "Creado"
    res.status(201).json({

      success: true,
      mensaje: "Administrador creado correctamente",

      data: {
        id: usuario.id,
        email: usuario.email
      }

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,
      mensaje: "Error al registrar administrador"

    });

  }

};

module.exports = {
  registrarAdminApi
};