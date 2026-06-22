const Producto = require("../../models/Producto");

// Controlador para mostrar catálogo de productos
const mostrarCatalogo = async (req, res) => {

  try {
    // pido el nombre del cliente por query para mostrarlo en el catalogo
    const nombreCliente = req.query.nombreCliente;

    const productos = await Producto.findAll({
      where: {
        activo: true
      }
    });
  

    res.render("cliente/catalogoProductos", {
      productos,
      nombreCliente
    });

  } catch (error) {

    console.log(error);
    res.send("Error al cargar el catálogo");

  }

};

module.exports = {
  mostrarCatalogo
};