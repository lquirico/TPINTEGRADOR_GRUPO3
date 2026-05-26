// importo Sequelize y dotenv para manejar las variables de entorno
const { Sequelize } = require("sequelize");
require("dotenv").config(); // cargo las variables de entorno desde el archivo .env

// creo una instancia de Sequelize con la configuración de la base de datos
const sequelize = new Sequelize(
  // tomo los valores de la base de datos desde las variables de entorno
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    // configuro el host, el dialecto y el puerto de la base de datos
    host: process.env.DB_HOST,
    dialect: "mysql", // especifico que el dialecto es MySQL
    port: process.env.DB_PORT
  }
);

module.exports = sequelize;