const Producto = require("../../models/Producto");

// API - Listar productos
const listarProductosApi = async (req, res) => {

  try {

    // Obtener numero de pagina desde query string, si no especifico nada muestro la 1 por default
   const pagina = parseInt(req.query.pagina) || 1;

   // aca obtengo la categoria desde query string, si no se especifica, se muestra "Todos"
    const categoria = req.query.categoria || "Todos";

    // seteo el limite de productos por pagina.
    const limite = 4;

    // armo el objeto "where" para filtrar por categoria si se especifica una diferente a "Todos"
     const where = {};

     // si paso una categoria diferente a todos, lo agrego al objeto where para que se filtre por esa categoria
    if (categoria !== "Todos") {

      where.categoria = categoria;

    }

    // Cantidad total de productos, el where se utiliza para contar solo los productos que cumplen con el filtro de categoria,
    //  si se especifica una diferente a "Todos"
    const totalProductos = await Producto.count({
      where
    });

    // Total de paginas, uso ceil para redondear
    const totalPaginas = Math.ceil(
      totalProductos / limite
    );


    // Obtener productos de la pagina solicitada
    const productos = await Producto.findAll({
      where,

      limit: limite,

      // el offset es para saltar productos y mostrar los de la pagina solicitada.
      offset: (pagina - 1) * limite,

      // aca ordeno por id ascendente, es decir del 1 al 10, del 11 al 20, etc. 
      order: [["id", "ASC"]]

    });

    // aca respondo con un json con toda la informacion necesaria para mostrar los productos en la pagina,
    // incluyendo la categoria, la pagina actual, el total de paginas, el total de productos y los productos de la pagina solicitada.
    res.json({

      success: true,

      categoria,

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
// aca pido los datos del producto desde el body y los guardo en variables para luego crear el producto.
    const {
      nombre,
      descripcion,
      precio,
      imagen,
      categoria,
      genero
    } = req.body;

// aca creo el producto, el trim es para borrar los espacion al principio y al final del campo de texto
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
// busco producto por ID.
const obtenerProductoApi = async (req, res) => {

  try {

    // busco por la primary key, que en este caso es el id del producto, que se pasa por params en la ruta.
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


// API - Baja logica de producto
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