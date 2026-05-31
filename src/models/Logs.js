const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Logs = sequelize.define("Logs", {
    usuarioID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },

    accion: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
module.exports = Logs;