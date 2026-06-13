const Producto = require("../models/Producto");
const Logs = require("../models/Logs");


// Controladores para productos
const listarProductos = async (req, res) => {

  try {

    // Solo mostramos los productos activos
    const productos = await Producto.findAll();

    // Renderizamos la vista de productos y le pasamos los productos obtenidos
    res.render("productos", {
      productos
    });

  } catch (error) {

    res.send("Error al cargar productos");

  }

};

// Controlador para mostrar el formulario de nuevo producto
const mostrarFormularioNuevo = (req, res) => {

  res.render("nuevoProducto");

};

// Controlador para crear un nuevo producto
const crearProducto = async (req, res) => {

  try {

    // Creamos el nuevo producto con los datos del formulario
    await Producto.create({

      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      imagen: req.file.filename,
      categoria: req.body.categoria,
      genero: req.body.genero

    });

    // Registramos la accion en los logs
    await Logs.create({

      usuarioId: req.session.usuario.id,
      fecha: new Date(),
      accion: `Se creo el producto ${req.body.nombre} correctamente`

    });
    // Redirigimos a la lista de productos
    res.redirect("/productos");

  } catch (error) {

    console.log(error);
    res.send("Error al guardar producto");

  }

};

// Controlador para mostrar el formulario de editar producto
const mostrarFormularioEditar = async (req, res) => {

  try {
    // Buscamos el producto por su ID
    const producto = await Producto.findByPk(req.params.id);
    // Si no encontramos el producto, mostramos un mensaje de error
    if (!producto) {
      return res.send("Producto no encontrado");
    }
    // Renderizamos la vista de editar producto y le pasamos el producto encontrado
    res.render("editarProducto", {
      producto
    });

  } catch (error) {

    res.send("Error");

  }

};

// Controlador para editar un producto
const editarProducto = async (req, res) => {

  try {
    // Buscamos el producto por su ID
    const producto = await Producto.findByPk(req.params.id);
    // Si no encontramos el producto, mostramos un mensaje de error
    if (!producto) {
      return res.send("Producto no encontrado");
    }
    // Actualizamos el producto con los nuevos datos del formulario
    await producto.update({

      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      imagen: req.file.filename,
      categoria: req.body.categoria,
      genero: req.body.genero

    });
    // Registramos la accion en los logs
    await Logs.create({

      usuarioId: req.session.usuario.id,
      fecha: new Date(),
      accion: `Se edito el producto ${req.body.nombre} correctamente`

    });
    // Redirigimos a la lista de productos
    res.redirect("/productos");

  } catch (error) {

    console.log(error);
    res.send("Error al actualizar");

  }

};

// Controlador para eliminar un producto (en realidad lo que hacemos es marcarlo como inactivo)
const eliminarProducto = async (req, res) => {

  try {
    // Buscamos el producto por su ID
    const producto = await Producto.findByPk(req.params.id);
    // Si no encontramos el producto, mostramos un mensaje de error
    if (!producto) {
      return res.send("Producto no encontrado");
    }
    // Marcamos el producto como inactivo en lugar de eliminarlo fisicamente
    await producto.update({
      activo: false
    });
    // Registramos la accion en los logs
    await Logs.create({

      usuarioId: req.session.usuario.id,
      fecha: new Date(),
      accion: `Se elimino el producto ${producto.nombre} correctamente`

    });

    res.redirect("/productos");

  } catch (error) {

    console.log(error);
    res.send("Error al eliminar");

  }

};

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

    res.redirect("/productos");

  } catch (error) {

    console.log(error);
    res.send("Error al activar");

  }

};

// Exportamos los controladores para que puedan ser utilizados en las rutas
module.exports = {

  listarProductos,
  mostrarFormularioNuevo,
  crearProducto,
  mostrarFormularioEditar,
  editarProducto,
  eliminarProducto,
  activarProducto
};