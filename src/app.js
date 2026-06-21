// Punto de entrada de la aplicación

const express = require("express"); // aca se importa express para crear la aplicación web
const path = require("path"); // se importa path para manejar rutas de archivos como por ejemplo para servir archivos estáticos
const session = require("express-session"); // se importa express-session para manejar sesiones de usuario
const carritoRoute = require("./routes/cliente/carritoRoute"); //se importan las rutas relacionadas con el carrito (visualización del carrito, modificación de productos y proceso de compra)
const sequelize = require("./config/database"); // se importa la configuración de la base de datos usando Sequelize

require("./models/asociaciones"); // se importan las asociaciones entre modelos de la base de datos, esto es necesario para que Sequelize pueda manejar las relaciones entre tablas

// Rutas
const productosRoutes = require("./routes/admin/productosRoutes"); // se importan las rutas para la administración de productos
const authRoutes = require("./routes/admin/authRoutes"); // se importan las rutas para la autenticación de usuarios (login, logout, etc.)
const catalogoRoute = require("./routes/cliente/catalogoRoute"); // se importan las rutas para el catalogo de productos que los clientes pueden ver

// API
const productosApiRoutes = require("./routes/api/productosApiRoutes");
const authApiRoutes = require("./routes/api/authApiRoutes");

// Crear app
const app = express(); // se crea una instancia de la aplicación Express, que es el servidor web que manejara las solicitudes HTTP y las respuestas

// Middlewares
app.use(express.json()); // se agrega un middleware para parsear el cuerpo de las solicitudes HTTP en formato JSON, esto es útil para manejar datos enviados desde formularios o APIs
app.use(express.urlencoded({ extended: true })); // se agrega un middleware para parsear el cuerpo de las solicitudes HTTP en formato URL-encoded, esto es útil para manejar datos enviados desde formularios HTML

// se agrega un middleware para servir archivos estáticos desde la carpeta "public", esto permite que los archivos como imágenes, CSS y JavaScript estén disponibles para el cliente
app.use(express.static(path.join(__dirname, "..", "public"))); 




// se configura el middleware de sesiones, esto permite mantener la información del usuario a través de diferentes solicitudes HTTP,
// como por ejemplo para mantener al usuario autenticado mientras navega por el sitio
app.use(
  session({
    secret: "tp-integrador-grupo3", // se establece una clave secreta para firmar la cookie de sesión, esto es importante para la seguridad de las sesiones
    resave: false, // se establece que la sesión no se vuelva a guardar en cada solicitud si no ha sido modificada, esto mejora el rendimiento al reducir el número de operaciones de escritura en la sesión
    saveUninitialized: false // se establece que no se guarde una sesión nueva si no ha sido modificada, esto evita crear sesiones innecesarias para usuarios que no interactúan con el sitio
  })
);

// Motor de vistas
app.set("view engine", "ejs"); // se establece EJS como el motor de plantillas para renderizar las vistas, esto permite generar HTML dinámico a partir de archivos de plantilla
app.set("views", path.join(__dirname, "views")); // se establece la carpeta "views" como el lugar donde se encuentran las plantillas EJS, esto permite organizar las vistas en una ubicación específica dentro del proyecto

//-----------------------------------------------------------------------------
//Arcihvos estáticos
//Se configura la carpeta "public" para que Express pueda servir archivos estáticos como hojas de estilo (CSS), imágenes y archivos JS.
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
d903adeda966cb72077a19cb2ca0d20cd3aabcc8

// Página principal
app.get("/", (req, res) => {
  res.render("bienvenida");
});

// Base de datos 
// se intenta conectar a la base de datos utilizando Sequelize, si la conexión es exitosa se muestra un mensaje en la consola, si hay un error se muestra el error en la consola
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a MySQL exitosa");
  })
  .catch((error) => {
    console.log("Error de conexión:", error);
  });

  // se sincronizan los modelos de Sequelize con la base de datos, esto crea las tablas correspondientes en la base de datos si no existen
  // y asegura que la estructura de la base de datos esté actualizada con los modelos definidos en el código
sequelize.sync();

// se establece el puerto en el que el servidor escuchará las solicitudes HTTP, se utiliza la variable de entorno PORT si está definida, o el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;

// se inicia el servidor y se muestra un mensaje en la consola indicando que el servidor está corriendo y en qué puerto está escuchando las solicitudes
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});