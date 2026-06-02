// importar express y crear un router para manejar las rutas relacionadas
// con productos
const express = require("express");
const router = express.Router();

// Importar el modelo de Producto
const Producto = require("../models/Producto");

//--------------------------------------------------------------------------------------------------------
// Listar productos activos
router.get("/", async (req, res) => {

  try {

    const productos = await Producto.findAll({
      where: {
        activo: true
      }
    });

    res.render("productos", {
      productos
    });

  } catch (error) {

    res.send("Error al cargar productos");

  }

});

//--------------------------------------------------------------------------------------------------------
// Ruta para mostrar el formulario de nuevo producto
router.get("/nuevo", (req, res) => {

  res.render("nuevoProducto");

});

//--------------------------------------------------------------------------------------------------------
// Ruta para manejar el envio del formulario de nuevo producto
router.post("/nuevo", async (req, res) => {

  try {

    await Producto.create({

      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      imagen: req.body.imagen,
      categoria: req.body.categoria,
      genero: req.body.genero

    });

    res.redirect("/productos");

  } catch (error) {

    console.log(error);

    res.send("Error al guardar producto");

  }

});

//--------------------------------------------------------------------------------------------------------
// Ruta para mostrar el formulario de edicion de un producto con su debida informacion
router.get("/editar/:id", async (req, res) => {

  try {

    const producto = await Producto.findByPk(req.params.id); // el req.params es un objeto que contiene los parametros de la ruta, en este caso el id del producto que se quiere editar

    if (!producto) {
      return res.send("Producto no encontrado");
    }

    res.render("editarProducto", {
      producto
    });

  } catch (error) {

    res.send("Error al buscar producto");

  }

});

//--------------------------------------------------------------------------------------------------------
// Ruta para manejar el envio del formulario de edicion de un producto y guardar los cambios realizados
router.post("/editar/:id", async (req, res) => {

  try {

    const producto = await Producto.findByPk(req.params.id);

    if (!producto) {
      return res.send("Producto no encontrado. Intente nuevamente.");
    }

    await producto.update({

      nombre: req.body.nombre,   // el req.body es un objeto que contiene los datos enviados desde el formulario, y se accede a cada campo por su nombre (name) definido en el formulario
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      imagen: req.body.imagen,
      categoria: req.body.categoria,
      genero: req.body.genero

    });

    res.redirect("/productos");

  } catch (error) {

    res.send("Error al actualizar el producto. Intente nuevamente.");

  }

});

//--------------------------------------------------------------------------------------------------------
// Ruta para eliminar un producto (en realidad lo que hace es marcarlo como inactivo para no mostrarlo en la lista de productos)
router.post("/eliminar/:id", async (req, res) => {

  try {

    const producto = await Producto.findByPk(req.params.id); // el findByPk es un metodo de sequelize que busca un registro por su clave primaria (id en este caso)

    if (!producto) {
      return res.send("Producto no encontrado");
    }

    await producto.update({
      activo: false
    });

    res.redirect("/productos");

  } catch (error) {

    res.send("Error al eliminar");

  }

});

module.exports = router;