//==============================
//SERVICIO DE GENERACIÓN DE PDF
//==============================

//Se utiliza Puppeteer para abrir una página HTML
//del ticket de compra y lo va a convertir en archivo PDF.

const puppeteer = require("puppeteer");
const path = require("path");


//========================
// GENERAR TICKET PDF
//========================

//la función recibe el ID de una venta
//con el ID se puede abrir la página del ticket correspondiente y convertirlo en PDF

const generarTicketPdf = async(ventaId) =>{
    //se inicia un navegador controlado por puppeteer
    const browser = await puppeteer.launch({
        headless: true //headless:true hace que el navegador se ejecute sin abrirse visualmente

    });

    //se abre una nueva pestaña dentro del navegador
    const page = await browser.newPage();

    //URL de la página HTML que vamos a convertir a PDF
    const url = `http://localhost:3000/carrito/ticket/${ventaId}`;

    //puppeteer navega hacia la página del ticket
    await page.goto(url, {
        waitUntil: "networkidle0"
    });

    //ruta donde se va a guardar el PDF generado.
    const rutaPDF = path.join(
        __dirname,
        "../../public/tickets",
        `ticket-${ventaId}.pdf`
    );

    //se genera el PDF a partir del HTML
    await page.pdf({
        path: rutaPDF,
        format: "A4",
        printBackground: true
    });

    //se cierra el navegador
    await browser.close();

    //se devuelve la ruta del pdf generado
    return `/tickets/ticket-${ventaId}.pdf`;


};

module.exports={
    generarTicketPdf
};