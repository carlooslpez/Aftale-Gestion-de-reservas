const express = require("express");
const router = express.Router();
const connection = require("../db");

// Mostrar todos los servicios
router.get("/servicios", (req, res) => {
    const sql = "SELECT id_servicio as id, nombre_servicio, id_categoria_servicio as id_categoria FROM servicios";

    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error al obtener servicios: ", error);
            res.status(500).send("Error al obtener servicios");
            return;
        }

        res.json(results);
    });
});

//  Información del servicio con ID: **** ?

router.get("/servicios/:id_servicio", (req, res) => {
    const servicioId = req.params.id_servicio;
    const sql = "SELECT nombre_servicio FROM servicios WHERE id_servicio = ?";

    connection.query(sql, [servicioId], (error, results) => {
        if (error) {
            console.error("Error al obtener servicio: ", error);
            res.status(500).send("Error al obtener servicio");
            return;
        }

        if (results.length === 0) {
            res.status(404).send("servicio no encontrado");
            return;
        }

        res.json(results[0]);
    });
});


//  Información de los servicios que da la categoria

router.get("/servicios/id_categoria/:id_categoria_servicio", (req, res) => {
    const idCategoria = req.params.id_categoria_servicio;
    const sql = "SELECT nombre_servicio FROM servicios WHERE id_categoria_servicio = ?";

    connection.query(sql, [idCategoria], (error, results) => {
        if (error) {
            console.error("Error al obtener los nombres de servicio: ", error);
            res.status(500).send("Error al obtener los nombres de servicio");
            return;
        }

        if (results.length === 0) {
            res.status(404).send("No se encontraron servicios para la categoría especificada");
            return;
        }

        const nombresServicio = results.map(result => result.nombre_servicio);
        res.json(nombresServicio);
    });
});



module.exports = router;
