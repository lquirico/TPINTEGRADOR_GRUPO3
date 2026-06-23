const { Ventas, Producto } = require("../../models/asociaciones"); // importo los modelos de Ventas y Producto desde el archivo de asociaciones, esto me permite interactuar con la base de datos y realizar consultas relacionadas con las ventas y los productos

const listarVentasApi = async (req, res) => {

  try {

    const ventas = await Ventas.findAll({
      // include lo uso para traer los productos asociados a cada venta,
      // y a su vez la cantidad de cada producto en esa venta
      include: [
        {
          model: Producto,
          as: "productos",

          through: {
            attributes: ["cantidad"]
          }
        }
      ],

      order: [["fecha", "DESC"]]

    });

    res.json({

      success: true,
      data: ventas

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,
      mensaje: "Error al obtener ventas"

    });

  }

};



module.exports = {
  listarVentasApi,
};

