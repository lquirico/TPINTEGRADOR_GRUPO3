const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Logs = sequelize.define("Logs", {
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Le agrego la referencia a la tabla UsuarioAdmins para que sepa que este campo 
        // es una clave foranea que hace referencia a la tabla UsuarioAdmins
        references: {
        model: "UsuarioAdmins",
        key: "id"
    }
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