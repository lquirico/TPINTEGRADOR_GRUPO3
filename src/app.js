//Este archivo es como la base de todo. Conecto las bases
// configuro las rutas e inicio la aplicacion

//importo express para crear el servidor/manejar rutas/responder request y construir la API
const express = require("express");
//importo sequelize para conectar con la base de datos y definir modelos(usa el .env)
const sequelize = require("./config/database");
//importo el modelo de producto para que sequelize sepa que existe 
// y pueda crear la tabla correspondiente
const Producto = require("./models/Producto");
const UsuarioAdmin = require("./models/UsuarioAdmin");
const Ventas = require("./models/Ventas");
const Venta_productos = require("./models/Venta_productos");
const Logs = require("./models/Logs");

//importo las rutas de productos para que el servidor sepa que existen y pueda usarlas
// dentro de este archivo estaran los GET/POST/PUT/DELETE relacionados con productos
const productosRoutes = require("./routes/productosRoutes");

//creo la aplicacion de express, que es el servidor que va a manejar las rutas
//y responder a los request
const app = express();

//permite que el servidor entienda los datos que vienen en formato JSON o URL-encoded (formularios HTML)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//le digo al servidor que use las rutas de productos
// para cualquier request que empiece con /api/productos
app.use("/api/productos", productosRoutes);

//ruta de prueba para verificar que el servidor esta funcionando
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

//conecto con la base de datos usando sequelize, verifico que la conexion sea exitosa
sequelize.authenticate()
  .then(() => {
    console.log("Conexión a MySQL exitosa");
  })
  .catch((error) => {
    console.log("Error de conexión:", error);
  });

  //sincronizo los modelos con la base de datos, esto crea las tablas si no existen
  // o las actualiza si ya existen de forma automatica (alter: true)
  sequelize.sync({ alter: true })
  .then(() => {
    console.log("Tablas sincronizadas");
  });

const PORT = 3000;

//inicio el servidor en el puerto especificado y muestro un mensaje en la consola
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});