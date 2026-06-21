// uso de bcrypt para encriptar contraseñas
const bcrypt = require("bcrypt");

// uso del modelo UsuarioAdmin
const UsuarioAdmin = require("../../models/UsuarioAdmin");

// API - Registrar administrador
const registrarAdminApi = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {

      return res.status(400).json({

        success: false,
        mensaje: "Todos los campos son obligatorios"

      });

    }

    const usuarioExistente = await UsuarioAdmin.findOne({
      where: { email }
    });

    if (usuarioExistente) {

      return res.status(400).json({

        success: false,
        mensaje: "Ya existe un usuario con ese email"

      });

    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await UsuarioAdmin.create({

      email,
      password: passwordHash

    });

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