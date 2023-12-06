// Dependencias
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js");

class Inventario extends Model {}
Inventario.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    CantidadActual: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Inventario",
    tableName: "Inventario",
    timestamps: false,
  },
);

module.exports = Inventario;
