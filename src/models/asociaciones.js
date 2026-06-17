const UsuarioAdmin = require("./UsuarioAdmin");
const Logs = require("./Logs");

const Producto = require("./Producto");
const Ventas = require("./Ventas");
const Venta_productos = require("./Venta_productos");



// un usuario admin puede tener muchos logs, pero un log solo pertenece a un usuario admin
UsuarioAdmin.hasMany(Logs, {
  foreignKey: "usuarioId"
});

// aca se establece la relación inversa, un log pertenece a un usuario admin
Logs.belongsTo(UsuarioAdmin, {
  foreignKey: "usuarioId"
});


// =================================================
// asociacion mediante la tabla intermedia Venta_productos
// ==================================================


// una venta puede tener muchos productos, y un producto puede estar en muchas ventas, por eso se usa una tabla intermedia para establecer la relación de muchos a muchos
Ventas.belongsToMany(Producto, {
  through: Venta_productos,
  foreignKey: "ventaId",
  otherKey: "productoId",
  as: "productos" // el as es para darle un alias a la relación, para que al hacer consultas podamos usar ese alias en lugar del nombre de la tabla intermedia
});

Producto.belongsToMany(Ventas, {
  through: Venta_productos,
  foreignKey: "productoId",
  otherKey: "ventaId",
  as: "ventas" // el as es para darle un alias a la relación, para que al hacer consultas podamos usar ese alias en lugar del nombre de la tabla intermedia
});


module.exports = {
  UsuarioAdmin,
  Logs,
  Producto,
  Ventas,
  Venta_productos
};