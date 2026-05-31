const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UsuarioAdmin = sequelize.define("UsuarioAdmin", {
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = UsuarioAdmin;