//Dependencias
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const errorHandler = require("./errorHandler.js");
const sequelize = require("./Database/db.js");
const GestorInventario = require("./Routes/GestorInventario.js");
const GestorProducto = require("./Routes/GestorProducto.js");
const GestorPromocion = require("./Routes/GestorPromocion.js");
const GestorVenta = require("./Routes/GestorVenta.js");

//Utilidades
const app = express();
app.use(cors());
app.use(errorHandler);
const port = process.env.API_PORT || 3000;

//Routing
app.use("/inventario", GestorInventario);
app.use("/producto", GestorProducto);
app.use("/promocion", GestorPromocion);
app.use("/venta", GestorVenta);

//Peticiones
app.get("/", (req, res, next) => {
  try {
    res.status(200).send("Patata");
  } catch {
    next(error);
  }
});

//Inicializar servidor
sequelize
  .authenticate()
  .then(() => {
    sequelize
      .sync()
      .then(() => {
        app.listen(port, function () {
          console.log("Servidor inicializado");
        });
      })
      .catch((error) => {
        console.log("Error al sincronizar");
        errorHandler(error);
      });
  })
  .catch((error) => {
    console.log("Error al autenticar");
    console.log(error);
    errorHandler(error);
  });
