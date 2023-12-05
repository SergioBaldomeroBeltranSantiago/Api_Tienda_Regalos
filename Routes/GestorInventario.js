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

    if (nuevoInventario) {
      res.status(200).send("Registro creado con exito");
    } else {
      res.status(404).send("Error al crear el registro");
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/eliminar", async function (req, res, next) {
  try {
    //Checamos si existe
    const inventarioExiste = await Inventario.findByPk(req.body.invID);

    if (inventarioExiste) {
      //Existe, entonces se elimina
      await inventarioExiste.destroy();
      res.status(200).send("Inventario borrado con exito");
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
    const listaInventario = await Inventario.findAll();
    if (listaInventario) {
      //Hay inventario, se envia
      res.status(200).send(listaInventario);
    } else {
      //No hay inventario, se notifica
      res.status(200).send("No hay inventario aun en el sistema.");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
