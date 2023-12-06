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

router.put("/actualizar", async function (req, res, next) {
  try {
    //Checamos si existe
    const promocionActualizar = await Promocion.findByPk(req.body.Codigo);

    if (promocionActualizar) {
      //Existe, entonces se modifica el precio
      const actTipoDescuento = req.body.nuevoTipoDescuento
        ? req.body.nuevoTipoDescuento == promocionActualizar.TipoDescuento
          ? promocionActualizar.TipoDescuento
          : req.body.TipoDescuento
        : promocionActualizar.TipoDescuento;

      const actDescuento = req.body.nuevoDescuento
        ? req.body.nuevoDescuento < 0 ||
          req.body.nuevoDescuento == promocionActualizar.Descuento
          ? promocionActualizar.Descuento
          : req.body.nuevoDescuento
        : promocionActualizar.Descuento;

      promocionActualizar.set({
        TipoDescuento: actTipoDescuento,
        Descuento: actDescuento,
      });

      const actualizacionExitosa = await promocionActualizar.save();
      if (actualizacionExitosa) {
        res.status(200).send("Promocion actualizada con exito");
      } else {
        res.status(200).send("Fallo al actualizar la promocion");
      }
    } else {
      //No existe
      res.status(200).send("No se encontro el registro");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/lista", async function (req, res, next) {
  try {
    //Se seleccionan todos los registros
    const listaPromocion = await Promocion.findAll();
    if (listaPromocion.length > 0) {
      //Hay inventario, se envia
      res.status(200).send(listaPromocion);
    } else {
      //No hay inventario, se notifica
      res.status(200).send("No hay promociones aun en el sistema.");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
