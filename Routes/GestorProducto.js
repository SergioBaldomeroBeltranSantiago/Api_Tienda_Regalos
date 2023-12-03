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
    const nuevoProducto = await Producto.create({
      Precio: req.body.Precio,
      ID: req.body.Inventario.ID,
    });

    res.sendStatus(nuevaPromocion ? 200 : 404);
  } catch (error) {
    next(error);
  }
});

router.delete("/eliminar", async function (req, res, next) {
  try {
    //Checamos si existe
    const productoExiste = await Producto.findByPk(req.body.Codigo);

    if (productoExiste) {
      //Existe, entonces se elimina
      await productoExiste.destroy();
      res.status(200).send("Inventario borrado con exito");
    } else {
      //No existe
      res.status(200).send("No se encontro el registro");
    }
  } catch (error) {
    next(error);
  }
});

router.put("/modificarPrecio", async function (req, res, next) {
  try {
    //Checamos si existe
    const productoActualizar = await Producto.findByPk(req.body.Codigo);

    if (productoActualizar) {
      //Existe, entonces se modifica el precio
      productoActualizar.set({
        Precio: req.body.precioActualizado,
      });
      const actualizacionExitosa = await productoActualizar.save();
      if (actualizacionExitosa) {
        res.status(200).send("Precio del producto actualizado con exito");
      } else {
        res.status(200).send("Fallo al actualizar el precio del producto");
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
