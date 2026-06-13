const UsuarioAdmin = require("./UsuarioAdmin");
const Logs = require("./Logs");

const Producto = require("./Producto");
const Ventas = require("./Ventas");
const Venta_productos = require("./Venta_productos");


// Asociaciones entre UsuarioAdmin y Logs. Un UsuarioAdmin puede tener muchos Logs, y cada Log pertenece a un UsuarioAdmin.
UsuarioAdmin.hasMany(Logs, {
  foreignKey: "usuarioId"
});

Logs.belongsTo(UsuarioAdmin, {
  foreignKey: "usuarioId"
});

// Asociaciones entre Ventas y Venta_productos. Una Venta puede tener muchos Venta_productos,
//  y cada Venta_producto pertenece a una Venta.
Ventas.hasMany(Venta_productos, {
  foreignKey: "ventaId"
});

Venta_productos.belongsTo(Ventas, {
  foreignKey: "ventaId"
});


// Asociaciones entre Producto y Venta_productos. Un Producto puede tener muchos Venta_productos, 
// y cada Venta_producto pertenece a un Producto.
Producto.hasMany(Venta_productos, {
  foreignKey: "productoId"
});

Venta_productos.belongsTo(Producto, {
  foreignKey: "productoId"
});