//Dependencias
const express = require("express");
const cors = require("cors");

const errorHandler = require("../errorHandler.js");

//Modelos
const Inventario = require("../Database/Models/Inventario.js");
const Producto = require("../Database/Models/Producto.js");

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
      InventarioID: req.body.Inventario.ID,
    });

    if (nuevoProducto) {
      res.status(200).send("Registro creado con exito");
    } else {
      res.status(200).send("Error al crear el registro");
    }
  } catch (error) {
    errorHandler(error);
  }
});

router.delete("/eliminar", async function (req, res, next) {
  try {
    //Checamos si existe
    const productoExiste = await Producto.findByPk(req.body.Codigo);

    if (productoExiste) {
      //Existe, entonces se elimina
      const productoEliminado = await productoExiste.destroy();
      if (productoEliminado) {
        res.status(200).send("Producto borrado con exito");
      } else {
        res.status(200).send("Error al eliminar el producto");
      }
    } else {
      //No existe
      res.status(200).send("No se encontro el registro");
    }
  } catch (error) {
    errorHandler(error);
  }
});

router.put("/actualizar", async function (req, res, next) {
  try {
    //Checamos si existe
    const productoActualizar = await Producto.findByPk(req.body.Codigo);

    if (productoActualizar) {
      //Existe, entonces se modifica el precio
      const actPrecio = req.body.nuevoPrecio
        ? req.body.nuevoPrecio < 0 ||
          req.body.nuevoPrecio == productoActualizar.Precio
          ? productoActualizar.Precio
          : req.body.nuevoPrecio
        : productoActualizar.Precio;

      productoActualizar.set({
        Precio: actPrecio,
      });

      const actualizacionExitosa = await productoActualizar.save();
      if (actualizacionExitosa) {
        res.status(200).send("Producto actualizado con exito");
      } else {
        res.status(200).send("Fallo al actualizar el producto");
      }
    } else {
      //No existe
      res.status(200).send("No se encontro el registro");
    }
  } catch (error) {
    errorHandler(error);
  }
});

router.get("/lista", async function (req, res, next) {
  try {
    //Se seleccionan todos los registros
    const listaProducto = await Producto.findAll();
    if (listaProducto.length > 0) {
      //Hay inventario, se envia
      res.status(200).send(listaProducto);
    } else {
      //No hay inventario, se notifica
      res.status(200).send([]);
    }
  } catch (error) {
    errorHandler(error);
  }
});

module.exports = router;
