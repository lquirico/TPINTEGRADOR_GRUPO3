const Producto = require("../../models/Producto");

const mostrarCatalogo = async (req, res) => {

  try {

    const nombreCliente =
      req.query.nombreCliente;

    const categoria =
      req.query.categoria || "Todos";

    const pagina =
      parseInt(req.query.pagina) || 1;

    const limite = 4;

    const filtro = {
      activo: true
    };

    if (categoria !== "Todos") {

      filtro.categoria = categoria;

    }

    const totalProductos =
      await Producto.count({
        where: filtro
      });

    const totalPaginas =
      Math.ceil(totalProductos / limite);

    const productos =
      await Producto.findAll({

        where: filtro,

        limit: limite,

        offset: (pagina - 1) * limite,

        order: [["id", "ASC"]]

      });

    res.render(
      "cliente/catalogoProductos",
      {

        productos,

        nombreCliente,

        categoria,

        paginaActual: pagina,

        totalPaginas

      }
    );

  } catch (error) {

    console.log(error);

    res.send(
      "Error al cargar el catalogo"
    );

  }

};

module.exports = {
  mostrarCatalogo
};