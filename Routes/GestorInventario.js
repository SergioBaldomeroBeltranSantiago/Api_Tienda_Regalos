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
router.use(
  express.json({
    limit: "2mb",
  }),
);
router.use(
  express.urlencoded({
    extended: true,
    limit: "2mb",
  }),
);
router.use(errorHandler);

//Peticiones
router.post("/nuevo", async function (req, res, next) {
  try {
    const nuevoInventario = await Inventario.create({
      Nombre: req.body.Nombre,
      Descripcion: req.body.Descripcion,
      CantidadActual: req.body.CantidadActual,
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
      const inventarioEliminado = await inventarioExiste.destroy();
      if (inventarioEliminado) {
        res.status(200).send("Inventario borrado con exito");
      } else {
        res.status(200).send("Fallo al eliminar el inventario");
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
    const inventarioExiste = Inventario.findByPk(req.body.invID);

    if (inventarioExiste) {
      //Si existe, se checan los valores a actualizar
      const actNombre = req.body.nuevoNombre
        ? req.body.nuevoNombre === "" ||
          req.body.nuevoNombre === inventarioExiste.Nombre
          ? inventarioExiste.Nombre
          : req.body.nuevoNombre
        : inventarioExiste.Nombre;

      const actDescripcion = req.body.nuevaDescripcion
        ? req.body.nuevaDescripcion === "" ||
          req.body.nuevaDescripcion === inventarioExiste.Descripcion
          ? inventarioExiste.Descripcion
          : req.body.nuevaDescripcion
        : inventarioExiste.Descripcion;

      const actCantidadActual = req.body.nuevaCantidadActual
        ? req.body.nuevaCantidadActual > 0 ||
          req.body.nuevaCantidadActual == inventarioExiste.CantidadActual
          ? inventarioExiste.CantidadActual
          : req.body.nuevaCantidadActual
        : inventarioExiste.CantidadActual;

      //Se actualizan los valores
      inventarioExiste.set({
        Nombre: actNombre,
        Descripcion: actDescripcion,
        CantidadActual: actCantidadActual,
      });

      const inventarioActualizado = inventarioExiste.save();

      if (inventarioActualizado) {
        res.status(200).send("Inventario actualizado exitosamente");
      } else {
        res.status(200).send("Fallo al actualizar el inventario");
      }
    } else {
      res.status(200).send("No se encontro el registro");
    }
  } catch (error) {
    next(error);
  }
});

router.put("/cargo", async function (req, res, next) {
  try {
    //Checamos si existe
    const inventarioExiste = Inventario.findByPk(req.body.invID);

    if (inventarioExiste) {
      //Se actualizan los valores
      inventarioExiste.set({
        CantidadActual:
          inventarioExiste.CantidadActual - req.body.cantidadVendida,
      });

      const inventarioActualizado = inventarioExiste.save();

      if (inventarioActualizado) {
        res.status(200).send("Cantidad de inventario actualizada exitosamente");
      } else {
        res
          .status(200)
          .send("Fallo al actualizar las cantidades del inventario");
      }
    } else {
      res.status(200).send("No se encontro el registro");
    }
  } catch (error) {
    next(error);
  }
});

router.put("/abono", async function (req, res, next) {
  try {
    //Checamos si existe
    const inventarioExiste = Inventario.findByPk(req.body.invID);

    if (inventarioExiste) {
      //Se actualizan los valores
      inventarioExiste.set({
        CantidadActual:
          inventarioExiste.CantidadActual + req.body.cantidadComprada,
      });

      const inventarioActualizado = inventarioExiste.save();

      if (inventarioActualizado) {
        res.status(200).send("Cantidad de inventario actualizada exitosamente");
      } else {
        res
          .status(200)
          .send("Fallo al actualizar las cantidades del inventario");
      }
    } else {
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
    if (listaInventario.length > 0) {
      //Hay inventario, se envia
      res.status(200).send(listaInventario);
    } else {
      //No hay inventario, se notifica
      res.status(200).send([]);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
