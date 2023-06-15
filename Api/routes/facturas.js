const express = require("express");
const router = express.Router();
const connection = require("../db");

//Mostrar todas las facturas
router.get("/facturas", (req, res) => {
    const sql = "SELECT * FROM facturas";

    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error al obtener facturas: ", error);
            res.status(500).send("Error al obtener facturas");
            return;
        }

        res.json(results);
    });
});

//Precio de la factura de la reserva -> ?

router.get("/facturas/:id_factura", (req, res) => {
    const facturaId = req.params.id_factura;
    const sql = "SELECT precio_factura FROM facturas WHERE id_factura = ?";

    connection.query(sql, [facturaId], (error, results) => {
        if (error) {
            console.error("Error al obtener precio de la factura: ", error);
            res.status(500).send("Error al obtener precio de la factura");
            return;
        }

        if (results.length === 0) {
            res.status(404).send("precio de la factura no encontrado");
            return;
        }

        res.json(results[0]);
    });
});

module.exports = router;
