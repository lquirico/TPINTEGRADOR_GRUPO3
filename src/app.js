// Punto de entrada de la aplicación

// IMPORTACIONES
const express = require("express");
const path = require("path");
const session = require("express-session");

const sequelize = require("./config/database");

require("./models/asociaciones");

// Rutas

// importar rutas para productos
const productosRoutes = require("./routes/productosRoutes");
const authRoutes = require("./routes/authRoutes");

// CREAR APP
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
  secret: "tp-integrador-grupo3",
  resave: false,
  saveUninitialized: false
}));

// MOTOR DE VISTAS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// RUTAS
app.use("/productos", productosRoutes);
app.use("/", authRoutes);

// PÁGINA DE INICIO
app.get("/", (req, res) => {
  res.render("bienvenida");
});

// CONEXIÓN A LA BASE DE DATOS
sequelize.authenticate()
  .then(() => {
    console.log("Conexión a MySQL exitosa");
  })
  .catch((error) => {
    console.log("Error de conexión:", error);
  });

// SINCRONIZAR MODELOS
sequelize.sync();

// INICIAR SERVIDOR
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});