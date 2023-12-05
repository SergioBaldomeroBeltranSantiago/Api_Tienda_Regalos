//Dependencias
const express = require("express");
const cors = require("cors");

const errorHandler = require("../errorHandler.js");

//Modelos
const Promocion = require("../Database/Models/Promocion.js");

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
    const nuevaPromocion = await Promocion.create({
      TipoDescuento: req.body.TipoDescuento,
      Descuento: req.body.Descuento,
      Codigo: req.body.Producto.Codigo,
    });

    if (nuevaPromocion) {
      res.status(200).send("Registro creado con exito");
    } else {
      res.status(200).send("Error al crear el registro");
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/eliminar", async function (req, res, next) {
  try {
    //Checamos si existe
    const promocionExiste = await Promocion.findByPk(req.body.ID);

    if (promocionExiste) {
      //Existe, entonces se elimina
      const promocionEliminada = await promocionExiste.destroy();
      if (promocionEliminada) {
        res.status(200).send("Promocion eliminada con exito");
      } else {
        res.status(200).send("Fallo al eliminar promocion");
      }
    } else {
      //No existe
      res.status(200).send("No se encontro el registro");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
