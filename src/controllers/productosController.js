const Producto = require("../models/Producto");

const listarProductos = async (req, res) => {

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

};

module.exports = {
  listarProductos
};