//Dependencias
const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const errorHandler = require("../errorHandler.js");

//Modelos
const Venta = require("../Database/Models/Venta.js");

//Utilidades
const router = express.Router();
router.use(cors());

//Middleware
router.use(express.json({ limit: "2mb" }));
router.use(express.urlencoded({ extended: true, limit: "2mb" }));
router.use(errorHandler);

//Peticiones
router.post("/nuevo", async function (req, res, next) {
  try {
    const nuevaVenta = await Venta.create({
      Total: req.body.Total,
      FechaVenta: Sequelize.NOW,
    });

    if (req.body.Producto) {
      await nuevaVenta.addProductos(req.body.Producto);
    }

    if (req.body.Promocion) {
      await nuevaVenta.addPromociones(req.body.Promocion);
    }

    if (nuevaVenta) {
      res.status(200).send("Registro creado con exito");
    } else {
      res.status(200).send("Error al crear el registro");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/ticket", async function (req, res, next) {
  try {
    //Checamos si existe
    const ventaExiste = await Venta.findByPk(req.query.ID, {
      include: [Producto, Promocion],
    });

    if (ventaExiste) {
      //Existe, entonces se envia
      res.status(200).send(ventaExiste);
    } else {
      //No existe
      res.status(200).send("No se encontro el registro");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
