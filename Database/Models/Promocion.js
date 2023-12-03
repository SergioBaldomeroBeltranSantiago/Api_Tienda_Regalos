//Dependencias
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js");

class Promocion extends Model {}
Promocion.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    TipoDescuento: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Descuento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Promocion",
    tableName: "Promociones",
    timestamps: false,
  },
);

module.exports = Promocion;
