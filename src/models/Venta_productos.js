const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Venta_productos = sequelize.define("Venta_productos", {
    ventaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Ventas",
            key: "id"
        }
    
    },

    productoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Productos",
            key: "id"
        }
    },

    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
module.exports = Venta_productos;