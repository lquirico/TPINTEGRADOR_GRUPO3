const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Ventas = sequelize.define("Ventas", {
    cliente_nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },

    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});
module.exports = Ventas;