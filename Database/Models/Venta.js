//Dependencias
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js");

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
    ProductosVendidos: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    PromocionesAplicadas: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { sequelize, modelName: "Venta", tableName: "Ventas", timestamps: false },
);

module.exports = Venta;
