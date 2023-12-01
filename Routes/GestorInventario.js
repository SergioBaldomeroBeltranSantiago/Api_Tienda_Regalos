//Dependencias
const express = require("express");
const cors = require("cors");

const errorHandler = require("../errorHandler.js");

//Modelos
const Inventario = require("../Database/Models/Inventario.js");

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
    const nuevoInventario = await Inventario.create({
      Nombre: req.body.Nombre,
      Descripcion: req.body.Descripcion,
      CantidadActual: req.body.CantidadActual,
      FechaAdquision: req.body.FechaAdquision,
    });

    res.sendStatus(nuevoInventario ? 200 : 404);
  } catch (error) {
    next(error);
  }
});

router.delete("/eliminar", async function (req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = router;
