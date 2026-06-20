const Producto = require("../../models/Producto");
const Logs = require("../../models/Logs");

// Controlador para listar productos
const listarProductos = async (req, res) => {

  try {
    // esta linea obtiene el numero de pagina de la query string, si no se especifica se asume que es la pagina 1. Se parsea a entero para asegurarse de que sea un numero.
    const pagina = parseInt(req.query.pagina) || 1; 
    const limite = 4;

    //Filtro
    const filtro = req.query.categoria || "Todos";
    const where = {};

    if (filtro !== "Todos") {
      where.categoria = filtro;
    }

    // esta linea obtiene el total de productos en la base de datos utilizando el metodo count() del modelo Producto. Esto es necesario para calcular el total de paginas disponibles.
    const totalProductos = await Producto.count({
      where
    }); 

    // esta linea calcula el total de paginas disponibles dividiendo el total de productos por el limite de productos por pagina y redondeando hacia arriba con Math.ceil()
    //  para asegurarse de que se muestre una pagina adicional si hay productos restantes.
    const totalPaginas = Math.ceil(totalProductos / limite); 

    // esta linea obtiene los productos de la base de datos utilizando el metodo findAll() del modelo Producto. Se especifica el limite de productos por pagina
    // el offset para saltar los productos de las paginas anteriores y el orden para mostrar los productos en orden ascendente por id.
    const productos = await Producto.findAll({

      where,

      limit: limite,

      offset: (pagina - 1) * limite,

      order: [["id", "ASC"]]

    });

    // esta linea renderiza la vista "admin/productos" y le pasa los productos obtenidos, 
    // el numero de pagina actual y el total de paginas disponibles para que se puedan mostrar en la interfaz de usuario.
    res.render("admin/productos", {

      productos,
      paginaActual: pagina,
      totalPaginas,
      filtro

    });

  } catch (error) {

    console.log(error);
    res.send("Error al cargar productos");

  }

};

// Controlador para mostrar formulario de alta
const mostrarFormularioNuevo = (req, res) => {

  res.render("admin/nuevoProducto");

};

// Controlador para crear producto
const crearProducto = async (req, res) => {

  try {

    const {
      nombre,
      descripcion,
      precio,
      categoria,
      genero
    } = req.body;

    // Validación imagen
    if (!req.file) {
      return res.send("Debe seleccionar una imagen");
    }

    // Validación precio
    if (isNaN(precio) || Number(precio) < 0) {
      return res.send("El precio debe ser un número mayor o igual a 0");
    }

    // Validación categoría
    const categoriasValidas = ["Libro", "Película"];

    if (!categoriasValidas.includes(categoria)) {
      return res.send("Categoría inválida");
    }

    await Producto.create({

      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio,
      imagen: req.file.filename,
      categoria,
      genero: genero.trim()

    });

    await Logs.create({

      usuarioId: req.session.usuario.id,
      fecha: new Date(),
      accion: `Se creo el producto ${nombre} correctamente`

    });

    res.redirect("/admin/productos");

  } catch (error) {

    console.log(error);
    res.send("Error al guardar producto");

  }

};

// Controlador para mostrar formulario de edición
const mostrarFormularioEditar = async (req, res) => {

  try {

    const producto = await Producto.findByPk(req.params.id);

    if (!producto) {
      return res.send("Producto no encontrado");
    }

    res.render("admin/editarProducto", {
      producto,
      pagina: req.query.pagina || 1
    });

  } catch (error) {

    console.log(error);
    res.send("Error al cargar producto");

  }

};

// Controlador para editar producto
const editarProducto = async (req, res) => {

  try {

    const producto = await Producto.findByPk(req.params.id);

    if (!producto) {
      return res.send("Producto no encontrado");
    }

    const {
      nombre,
      descripcion,
      precio,
      categoria,
      genero
    } = req.body;

    let nombreImagen = producto.imagen;

    if (req.file) {
      nombreImagen = req.file.filename;
    }

    await producto.update({

      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio,
      imagen: nombreImagen,
      categoria,
      genero: genero.trim()

    });

    await Logs.create({

      usuarioId: req.session.usuario.id,
      fecha: new Date(),
      accion: `Se edito el producto ${nombre} correctamente`

    });

    const pagina = req.body.pagina || 1;

    res.redirect(`/admin/productos?pagina=${pagina}`);

  } catch (error) {

    console.log(error);
    res.send("Error al actualizar");

  }

};

// Controlador para eliminar (baja lógica)
const eliminarProducto = async (req, res) => {

  try {

    const producto = await Producto.findByPk(req.params.id);

    if (!producto) {
      return res.send("Producto no encontrado");
    }

    await producto.update({
      activo: false
    });

    await Logs.create({

      usuarioId: req.session.usuario.id,
      fecha: new Date(),
      accion: `Se elimino el producto ${producto.nombre} correctamente`

    });

    res.redirect("/admin/productos");

  } catch (error) {

    console.log(error);
    res.send("Error al eliminar");

  }

};

// Controlador para activar producto
const activarProducto = async (req, res) => {

  try {

    const producto = await Producto.findByPk(req.params.id);

    if (!producto) {
      return res.send("Producto no encontrado");
    }

    await producto.update({
      activo: true
    });

    await Logs.create({

      usuarioId: req.session.usuario.id,
      fecha: new Date(),
      accion: `Se activo el producto ${producto.nombre}`

    });

    res.redirect("/admin/productos");

  } catch (error) {

    console.log(error);
    res.send("Error al activar");

  }

};

module.exports = {

  listarProductos,
  mostrarFormularioNuevo,
  crearProducto,
  mostrarFormularioEditar,
  editarProducto,
  eliminarProducto,
  activarProducto

};