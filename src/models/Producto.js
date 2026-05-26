//importamos el modulo de sequelize y la conexion a la base de datos
//asi puedo usar STRING/TEXT/FLOAT etc
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); //importamos la conexion a la base de datos

const Producto = sequelize.define("Producto", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false //no puede ser nulo
  },

  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  imagen: {
    type: DataTypes.STRING, //puede ser una URL o una ruta local
    allowNull: false
  },

  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  },

  activo: {
    type: DataTypes.BOOLEAN, //si el producto esta activo o no, para eliminarlo logicamente
    defaultValue: true //por defecto es activo, si se elimina logicamente se pone en false
  }
});

module.exports = Producto;