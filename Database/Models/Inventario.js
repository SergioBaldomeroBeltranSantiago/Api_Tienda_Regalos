//Dependencias
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js");

//Asociaciones
const Producto = require("./Producto.js");

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
    FechaAdquision: {
      type: DataTypes.DATE,
      allowNull: false,
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
Producto.belongsTo(Inventario);

//One-To-One
Inventario.hasOne(Producto, {
  foreignKey: {
    name: "InventarioID",
    allowNull: false,
    onDelete: "CASCADE",
  },
});

module.exports = Inventario;
