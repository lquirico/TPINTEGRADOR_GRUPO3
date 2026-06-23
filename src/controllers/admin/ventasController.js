const { Ventas, Producto } = require("../../models/asociaciones"); // importo los modelos de Ventas y Producto desde el archivo de asociaciones, esto me permite interactuar con la base de datos y realizar consultas relacionadas con las ventas y los productos

const mostrarVentas = (req, res) => {

  res.render("admin/ventas");

};

module.exports = {
  mostrarVentas
};