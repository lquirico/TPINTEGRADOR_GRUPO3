const Producto = require("../../models/Producto");

// API - Listar productos
const listarProductosApi = async (req, res) => {

  try {

    // Obtener número de página desde query string
    const pagina = parseInt(req.query.pagina) || 1;

    const limite = 4;

    // Cantidad total de productos
    const totalProductos = await Producto.count();

    // Total de páginas
    const totalPaginas = Math.ceil(
      totalProductos / limite
    );

    // Obtener productos de la página solicitada
    const productos = await Producto.findAll({

      limit: limite,

      offset: (pagina - 1) * limite,

      order: [["id", "ASC"]]

    });

    res.json({

      success: true,

      paginaActual: pagina,

      totalPaginas,

      totalProductos,

      data: productos

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,
      mensaje: "Error al obtener productos"

    });

  }

};


// API - Crear producto
const crearProductoApi = async (req, res) => {

  try {

    const {
      nombre,
      descripcion,
      precio,
      imagen,
      categoria,
      genero
    } = req.body;


    await Producto.create({

      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio,
      imagen: imagen.trim(),
      categoria,
      genero: genero.trim()

    });

    res.status(201).json({

      success: true,
      mensaje: "Producto creado correctamente"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,
      mensaje: "Error al crear producto",
      data: producto

    });

  }

};


// API - Obtener producto por ID
const obtenerProductoApi = async (req, res) => {

  try {

    const producto = await Producto.findByPk(req.params.id);

    if (!producto) {

      return res.status(404).json({

        success: false,
        mensaje: "Producto no encontrado"

      });

    }

    res.json({

      success: true,
      data: producto

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,
      mensaje: "Error al obtener producto"

    });

  }

};

// API - Editar producto
const editarProductoApi = async (req, res) => {

  try {

    const producto = await Producto.findByPk(req.params.id);

    if (!producto) {

      return res.status(404).json({

        success: false,
        mensaje: "Producto no encontrado"

      });

    }

    const {
      nombre,
      descripcion,
      precio,
      imagen,
      categoria,
      genero
    } = req.body;


    await producto.update({

      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio,
      imagen: imagen.trim(),
      categoria,
      genero: genero.trim()

    });

    res.json({

      success: true,
      mensaje: "Producto actualizado correctamente",
      data: producto

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,
      mensaje: "Error al actualizar producto"

    });

  }

};


// API - Baja lógica de producto
const eliminarProductoApi = async (req, res) => {

  try {

    const producto = await Producto.findByPk(req.params.id);

    if (!producto) {

      return res.status(404).json({

        success: false,
        mensaje: "Producto no encontrado"

      });

    }

    await producto.update({

      activo: false

    });

    res.json({

      success: true,
      mensaje: "Producto eliminado correctamente"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,
      mensaje: "Error al eliminar producto"

    });

  }

};

// API - Activar producto
const activarProductoApi = async (req, res) => {

  try {

    const producto = await Producto.findByPk(req.params.id);

    if (!producto) {

      return res.status(404).json({

        success: false,
        mensaje: "Producto no encontrado"

      });

    }

    await producto.update({

      activo: true

    });

    res.json({

      success: true,
      mensaje: "Producto activado correctamente"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,
      mensaje: "Error al activar producto"

    });

  }

};

module.exports = {
  listarProductosApi,
  crearProductoApi,
    obtenerProductoApi,
    editarProductoApi,
    eliminarProductoApi,
    activarProductoApi
};