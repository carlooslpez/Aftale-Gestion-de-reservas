const express = require("express");
const router = express.Router();
const connection = require("../db");

//  Mostrar todas las categorias
router.get("/categorias", (req, res) => {
    const sql = "SELECT * FROM categorias";

    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error al obtener categorias: ", error);
            res.status(500).send("Error al obtener categorias");
            return;
        }

        res.json(results);
    });
});

//  Información de la categoria con ID: **** ?

router.get("/categorias/:id_categoria", (req, res) => {
    const categoriaId = req.params.id_categoria;
    const sql =
        "SELECT nombre_categoria, descripcion_categoria FROM categorias WHERE id_categoria = ?";

    connection.query(sql, [categoriaId], (error, results) => {
        if (error) {
            console.error("Error al obtener categoria: ", error);
            res.status(500).send("Error al obtener categoria");
            return;
        }

        if (results.length === 0) {
            res.status(404).send("categoria no encontrada");
            return;
        }

        res.json(results[0]);
    });
});



module.exports = router;
