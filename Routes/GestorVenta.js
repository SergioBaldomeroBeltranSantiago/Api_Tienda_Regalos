//Dependencias
const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const errorHandler = require("../errorHandler.js");

//Modelos
const Producto = require("../Database/Models/Producto.js");
const Promocion = require("../Database/Models/Promocion.js");
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
    console.log(req.body);
    const productosVendidos = req.body.ventaProductos.split("$");
    let promocionesAplicadas = "";

    let prevTotal = 0;
    for (const productoVendido of productosVendidos) {
      //Obtenemos el producto
      const productoExiste = await Producto.findByPk(productoVendido);
      if (productoExiste) {
        //Checamos si hay promociones asociadas
        const promocionesAplicables = await Promocion.findAll({
          where: { ProductoCodigo: productoVendido },
        });

        let prevCostoProducto = productoExiste.Precio;

        if (promocionesAplicables.length > 0) {
          //Si hay, se aplican
          for (let i = 0; i < promocionesAplicables.length; i++) {
            prevCostoProducto = promocionesAplicables[i].TipoDescuento
              ? prevCostoProducto *
                ((100 - promocionesAplicables[i].Descuento) / 100)
              : prevCostoProducto - promocionesAplicables[i].Descuento;

            //Se añade la promocion añadida al arreglo de promociones
            promocionesAplicadas =
              promocionesAplicadas + promocionesAplicables[i].ID + "$";
          }
        }

        //Al final, promociones o no, se suma el costo del producto al costo total
        prevTotal = prevTotal + prevCostoProducto;
      } else {
        res.status(404).send("Error al encontrar el producto vendido");
      }
    }

    //Una vez hayamos obtenido el costo total, los productos y promociones asociados, se crea la venta
    const nuevaVenta = await Venta.create({
      Total: prevTotal,
      FechaVenta: Date.now(),
      ProductosVendidos: req.body.ventaProductos,
      PromocionesAplicadas: promocionesAplicadas,
    });

    if (nuevaVenta) {
      res.status(200).send(nuevaVenta);
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
    const ventaExiste = await Venta.findByPk(req.body.ID);

    if (ventaExiste) {
      //Existe, entonces se elimina
      const ventaEliminada = await ventaExiste.destroy();
      if (ventaEliminada) {
        res.status(200).send("Venta eliminada con exito");
      } else {
        res.status(200).send("Fallo al eliminar venta");
      }
    } else {
      //No existe
      res.status(200).send("No se encontro el registro");
    }
  } catch (error) {
    errorHandler(error);
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
    errorHandler(error);
  }
});

router.get("/lista", async function (req, res, next) {
  try {
    //Se seleccionan todos los registros
    const listaVenta = await Venta.findAll();
    if (listaVenta.length > 0) {
      //Hay inventario, se envia
      res.status(200).send(listaVenta);
    } else {
      //No hay inventario, se notifica
      res.status(200).send([]);
    }
  } catch (error) {
    errorHandler(error);
  }
});

module.exports = router;
