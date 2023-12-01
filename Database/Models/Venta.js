//Dependencias
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js");

//Asociaciones
const Producto = require("./Producto.js");
const Promocion = require("./Promocion.js");

class Venta extends Model {}
Ventas.init(
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
  { sequelize, modelName: "Venta", tableName: "Ventas", timestamp: false },
);

//One or Many to One
Venta.hasMany(Producto, {
  foreignKey: {
    name: "Codigo",
    allowNull: false,
  },
});

//Zero or Many to One
Venta.hasMany(Promocion, {
  foreignKey: {
    name: "ID",
    allowNull: true,
  },
});

module.exports = Venta;
