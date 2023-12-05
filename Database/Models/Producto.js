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

//One to One
Producto.belongsTo(Inventario, {
  foreignKey: "InventarioID",
});

//Zero to Many
Producto.hasMany(Promocion, {
  foreignKey: "ProductoCodigo",
});

//One to One
Promocion.belongsTo(Producto, { foreignKey: "Codigo" });

module.exports = Producto;
