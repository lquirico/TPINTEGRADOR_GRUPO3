console.log("carritoRoute cargado.");

const express = require("express");
const router = express.Router();
const Producto = require("../../models/Producto");
const Ventas = require("../../models/Ventas");
const Venta_productos = require("../../models/Venta_productos");
const {generarTicketPdf} = require("../../services/pdfService");

//================================
//MOSTRAR TICKET DE UNA VENTA
//===============================
//esta vista la va a utilizar Puppeteer para generar el PDF
router.get("/ticket/:id", async(req, res) => {
    const venta = await Ventas.findByPk(
        req.params.id, {
            include:{
                model: Producto,
                as:"productos"
            }
        }
    );
    res.render(
        "cliente/ticket",
        {
            venta,
            productos: venta.productos
        }
    );
});




//===============================
//MOSTRAR VISTA DEL CARRITO
//===============================

//la ruta renderiza la vista del carrito del cliente
router.get("/", (req, res)=> {
    res.render("cliente/carrito");
});


//==================================
// MOSTRAR PANTALLA DE CONFIRMACIÓN
//==================================

//muestra la pantalla donde el cliente ve su resumen de compra
router.get("/confirmar", (req, res)=> {
    res.render("cliente/confirmarCompra");
});

//=========================================
// CONFIRMAR COMPRA Y  GUARDAR EN LA BASE
//=========================================

router.post("/confirmar", async(req, res)=> {
    try{
        console.log("ENTRÓ AL POST /carrito/confirmar");
        console.log("Datos recibidos: ", req.body);

        const {cliente_nombre, carrito, total} = req.body;

        //Crea la venta principal
        //solo guarda datos generales de la compra
        const venta = await Ventas.create({
            cliente_nombre,
            fecha: new Date(),
            total
        });
        console.log("Venta creada.", venta.id);

        //recorre los productos del carrito
        //cada producto se guarda en la tabla intermedia

        for (const producto of carrito){
            console.log("Guardando producto: ", producto.id, producto.cantidad);

            await Venta_productos.create({
                ventaId: venta.id,
                productoId: producto.id,
                cantidad: producto.cantidad
            });
        }
        //===========================
        // GENERAR PDF DEL TICKET
        //===========================
        const rutaPDF= await generarTicketPdf(venta.id);

        //==================
        //RESPUESTA EXITOSA
        //==================
        res.json({
            ok: true,
            mensaje: "Venta registrada correctamente",
            ventaId:venta.id,
            pdf: rutaPDF
        });

    }//manejo de errores
    catch(error){
        console.log("ERROR AL REGISTRAR LA VENTA");
        console.log(error);

        res.status(500).json({
            ok: false,
            mensaje: "Error al registrar la venta",
            error: error.message
        });
    }
});

//====================================
// MOSTRAR PANTALLA DE COMPRA EXITOSA
//====================================
router.get("/compra-exitosa", (req, res)=> {
    res.render("cliente/compraExitosa");
}); 


module.exports = router;