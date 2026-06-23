// Punto de entrada de la aplicación

const express = require("express"); // aca se importa express para crear la aplicacion web
const path = require("path"); // se importa path para manejar rutas de archivos como por ejemplo para servir archivos estaticos
const session = require("express-session"); // se importa express-session para manejar sesiones de usuario

//const sequelize = require("./config/database"); // se importa la configuracion de la base de datos usando Sequelize
const carritoRoute = require("./routes/cliente/carritoRoute"); //se importan las rutas relacionadas con el carrito (visualización del carrito, modificación de productos y proceso de compra)
const sequelize = require("./config/database"); // se importa la configuración de la base de datos usando Sequelize

require("./models/asociaciones"); // se importan las asociaciones entre modelos de la base de datos, esto es necesario para que Sequelize pueda manejar las relaciones entre tablas

// Rutas
const productosRoutes = require("./routes/admin/productosRoutes"); // se importan las rutas para la administracion de productos
const authRoutes = require("./routes/admin/authRoutes"); // se importan las rutas para la autenticacion de usuarios (login, logout, etc.)
const catalogoRoute = require("./routes/cliente/catalogoRoute"); // se importan las rutas para el catalogo de productos que los clientes pueden ver

// API
const productosApiRoutes = require("./routes/api/productosApiRoutes"); //importo las rutas para la API de productos
const authApiRoutes = require("./routes/api/authApiRoutes"); // importo las rutas para la API de autenticacion
const ventasApiRoutes = require("./routes/api/ventasApiRoutes"); // importo las rutas para la API de ventas
// Crear app
const app = express(); // se crea una instancia de la aplicacion Express (servidor web que manejara las solicitudes HTTP y las respuestas)

// Middlewares
app.use(express.json()); // se agrega un middleware para parsear el cuerpo de las solicitudes HTTP en formato JSON, esto es util para manejar datos enviados desde formularios o APIs
app.use(express.urlencoded({ extended: true })); // el urlencoded es un middleware que usamos para parsear solicitudes http. El extended: true nos permite parsear objetos anidados (util para datos complejos)
// se agrega un middleware para servir archivos estaticos desde la carpeta "public", esto permite que los archivos como imagenes, CSS y JavaScript esten disponibles para el cliente
app.use(express.static(path.join(__dirname, "..", "public"))); 




// se configura el middleware de sesiones, esto permite mantener la informacion del usuario a traves de diferentes solicitudes HTTP,
// como por ejemplo para mantener al usuario autenticado mientras navega por el sitio
app.use(
  session({
    secret: "tp-integrador-grupo3", // se establece una clave secreta para firmar la cookie de sesion, esto es importante para la seguridad de las sesiones
    resave: false, // se establece que la sesion no se vuelva a guardar en cada solicitud si no ha sido modificada, esto mejora el rendimiento al reducir el numero de operaciones de escritura en la sesion
    saveUninitialized: false // se establece que no se guarde una sesion nueva si no ha sido modificada, esto evita crear sesiones innecesarias para usuarios que no interactuan con el sitio
  })
);

// Motor de vistas
app.set("view engine", "ejs"); // se establece EJS como el motor de plantillas para renderizar las vistas, esto permite generar HTML dinamico a partir de archivos de plantilla
app.set("views", path.join(__dirname, "views")); // se establece la carpeta "views" como el lugar donde se encuentran las plantillas EJS, esto permite organizar las vistas en una ubicacion especifica dentro del proyecto

//-----------------------------------------------------------------------------
//Archivos estaticos
//Se configura la carpeta "public" para que Express pueda servir archivos estaticos como hojas de estilo (CSS), imagenes y archivos JS.
//Con esto, cualquier archivo ubicado en "public" podrá ser accedido desde el navegador con una ruta relativa.
app.use(express.static(path.join(__dirname, "../public")));



// Rutas
app.use("/admin/productos", productosRoutes);
//app.use("/", catalogoRoute);
app.use("/", authRoutes);
app.use("/productos", catalogoRoute);

app.use("/carrito", carritoRoute); 


//API
app.use("/api/productos", productosApiRoutes);
app.use("/api/admin", authApiRoutes);
app.use("/api/ventas", ventasApiRoutes);
app.use("/admin", productosRoutes);

// Página principal
app.get("/", (req, res) => {
  res.render("bienvenida");
});

// Base de datos 
// se intenta conectar a la base de datos utilizando Sequelize, si la conexion es exitosa se muestra un mensaje en la consola, si hay un error se muestra el error en la consola
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexion a MySQL exitosa");
  })
  .catch((error) => {
    console.log("Error de conexion:", error);
  });

  // se sincronizan los modelos de Sequelize con la base de datos, esto crea las tablas correspondientes en la base de datos si no existen
  // y asegura que la estructura de la base de datos este actualizada con los modelos definidos en el codigo
sequelize.sync();

// se establece el puerto en el que el servidor escuchará las solicitudes HTTP, se utiliza la variable de entorno PORT si esta definida, o el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;

// se inicia el servidor y se muestra un mensaje en la consola indicando que el servidor está corriendo y en que puerto esta escuchando las solicitudes
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});