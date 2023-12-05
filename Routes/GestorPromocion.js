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

    res.sendStatus(nuevaPromocion ? 200 : 404);
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
      await promocionExiste.destroy();
      res.status(200).send("Inventario borrado con exito");
    } else {
      //No existe
      res.status(200).send("No se encontro el registro");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;