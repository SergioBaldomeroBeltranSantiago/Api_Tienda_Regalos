//Dependencias
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js");

//Asociaciones
const Producto = require("./Producto.js");
const Promocion = require("./Promocion.js");

class Venta extends Model {}
Venta.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    FechaVenta: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Venta", tableName: "Ventas", timestamps: false },
);

// In Venta Model
Venta.belongsToMany(Producto, { through: "VentaProducto", as: "productos" });
Venta.belongsToMany(Promocion, {
  through: "VentaPromocion",
  as: "promociones",
});

module.exports = Venta;
