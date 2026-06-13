// Este archivo es el punto de entrada de la aplicación.
// Configura Express, la base de datos, las vistas y las rutas.

// IMPORTACIONES
const express = require("express");
const path = require("path");

const sequelize = require("./config/database");

//Importar modelos para sincronizar con la base de datos
const Producto = require("./models/Producto");
const UsuarioAdmin = require("./models/UsuarioAdmin");
const Ventas = require("./models/Ventas");
const Venta_productos = require("./models/Venta_productos");
const Logs = require("./models/Logs");


// importar rutas para productos
const productosRoutes = require("./routes/productosRoutes");

// CREAR APP
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar EJS como motor de plantillas y establecer la carpeta de vistas. EJS nos permite renderizar HTML dinámico en el servidor.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));// Configurar la carpeta de archivos estáticos para servir CSS, imágenes, etc.

// RUTAS
app.use("/productos", productosRoutes);

// PÁGINA DE INICIO
app.get("/", (req, res) => {
  res.render("bienvenida");
});

// CONEXION A LA BASE DE DATOS
sequelize.authenticate()
  .then(() => {
    console.log("Conexión a MySQL exitosa");
  })
  .catch((error) => {
    console.log("Error de conexion:", error);
  });

// Sincronizar las tablas con la base de datos. El método `sync` crea las tablas si no existen o las actualiza si ya existen (con `alter: true`).
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Tablas sincronizadas");
  })
  .catch((error) => {
    console.log("Error al sincronizar tablas:", error);
  });

// Levantar el servidor en el puerto 3000 y mostrar un mensaje en la consola cuando esté corriendo.
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});