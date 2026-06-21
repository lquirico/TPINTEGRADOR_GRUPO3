function validarProducto(req, res, next) {

  const {
    nombre,
    descripcion,
    precio,
    categoria,
    genero
  } = req.body;

  if (
    !nombre?.trim() ||
    !descripcion?.trim() ||
    !precio ||
    !categoria?.trim() ||
    !genero?.trim()
  ) {

    return res.send(
      "Todos los campos son obligatorios"
    );

  }

  if (
    isNaN(precio) ||
    Number(precio) < 0
  ) {

    return res.send(
      "El precio debe ser un numero mayor o igual a 0"
    );

  }

  const categoriasValidas = [
    "Libro",
    "Pelicula"
  ];

  if (
    !categoriasValidas.includes(categoria)
  ) {

    return res.send(
      "Categoria invalida"
    );

  }

  next();

}

module.exports = validarProducto;