//Dependencias
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js");

//Asociaciones
const Inventario = require("./Inventario.js");

class Producto extends Model {}

Producto.init(
  {
    Codigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
  },
  {
    sequelize,
    modelName: "Producto",
    tableName: "Productos",
    timestamps: false,
  },
);

//One-To-One
Inventario.hasOne(Producto, {
  foreignKey: {
    name: "ID",
    allowNull: false,
  },
});

module.exports = Producto;
