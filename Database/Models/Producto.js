//Dependencias
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js");

//Asociaciones
const Inventario = require("./Inventario.js");
const Promocion = require("./Promocion.js");

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

//Zero or One To One
Producto.hasMany(Promocion, {
  foreignKey: {
    name: "PromocionCodigo",
    allowNull: false,
  },
});

module.exports = Producto;
