//Dependencias
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js");

//Asociaciones
const Producto = require("./Producto.js");

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
      type: DataTypes.BIT,
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

//Zero or One To One
Producto.hasMany(Promocion, {
  foreignKey: {
    name: "Codigo",
    allowNull: false,
  },
});

module.exports = Promocion;
