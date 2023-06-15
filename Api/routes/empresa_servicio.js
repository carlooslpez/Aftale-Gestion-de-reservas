const express = require("express");
const router = express.Router();
const connection = require("../db");

//  Información de la empresa-servicio con ID: **** ?
/*router.get("/empresa-servicio/:id", (req, res) => {
    const empresaservicioId = req.params.id;
    const sql =
        "SELECT id_empresa, id_servicio, precio FROM empresa-servicio WHERE id = ?";

    connection.query(sql, [empresaservicioId], (error, results) => {
        if (error) {
            console.error("Error al obtener empresa: ", error);
            res.status(500).send("Error al obtener empresa");
            return;
        }

        if (results.length === 0) {
            res.status(404).send("empresa no encontrada");
            return;
        }

        res.json(results[0]);
    });
});*/

//  Información de la empresa-servicio con Id_servicio: **** ?
router.post("/empresa-servicio/:id_servicio", (req, res) => {
    const empresaservicioId = req.params.id_servicio;
    const sql =
        "SELECT es.id_empresa, es.precio, e.nombre_empresa, s.nombre_servicio FROM `empresa-servicio` AS es INNER JOIN empresas AS e ON es.id_empresa = e.id_empresa INNER JOIN servicios AS s ON es.id_servicio = s.id_servicio WHERE es.id_servicio = ?";

    connection.query(sql, [empresaservicioId], (error, results) => {
        if (error) {
            console.error(
                "Error al obtener información de la empresa, el servicio y el precio: ",
                error
            );
            res.status(500).send(
                "Error al obtener información de la empresa, el servicio y el precio"
            );
            return;
        }

        if (results.length === 0) {
            res.status(404).send("Empresa o servicio no encontrados");
            return;
        }

        res.json(results);
    });
});

//  Información de la empresa-servicio con id_empresa **** ?
router.post("/empresa-servicio/id_empresa/:id_empresa", (req, res) => {
    const empresaservicioId = req.params.id_empresa;
    const sql =
        "SELECT es.precio, e.nombre_empresa, s.nombre_servicio, es.id_servicio as id FROM `empresa-servicio` AS es INNER JOIN empresas AS e ON es.id_empresa = e.id_empresa INNER JOIN servicios AS s ON es.id_servicio = s.id_servicio WHERE es.id_empresa = ?";

    connection.query(sql, [empresaservicioId], (error, results) => {
        if (error) {
            console.error(
                "Error al obtener información de la empresa, el servicio y el precio: ",
                error
            );
            res.status(500).send(
                "Error al obtener información de la empresa, el servicio y el precio"
            );
            return;
        }

        if (results.length === 0) {
            res.status(404).send("Empresa o servicio no encontrados");
            return;
        }

        res.json(results);
    });
});

//  Información de la empresa-servicio con id_categoria **** ?

router.get("/empresa-servicio/id_categoria/:id_categoria", (req, res) => {
    const categoriaId = req.params.id_categoria;
    const sql =
        "SELECT es.id_empresa, es.precio, e.nombre_empresa, s.nombre_servicio FROM `empresa-servicio` AS es INNER JOIN empresas AS e ON es.id_empresa = e.id_empresa INNER JOIN servicios AS s ON es.id_servicio = s.id_servicio WHERE s.id_categoria_servicio = ?";

    connection.query(sql, [categoriaId], (error, results) => {
        if (error) {
            console.error("Error al obtener información de la empresa, el servicio y el precio: ", error);
            res.status(500).send("Error al obtener información de la empresa, el servicio y el precio");
            return;
        }

        if (results.length === 0) {
            res.status(404).send("No se encontraron empresas o servicios para la categoría especificada");
            return;
        }

        res.json(results);
    });
});

//BORRAR REALACION EMPRESA-SERVICIO
router.post("/borrar-empresa-servicio/:id_servicio/:id_empresa", (req, res) => {
    const { id_servicio, id_empresa } = req.params;
console.log(req.params);
    const sql = "DELETE FROM `empresa-servicio` WHERE id_servicio = ? AND id_empresa = ?";

    connection.query(sql, [id_servicio, id_empresa], (error, results) => {
        if (error) {
            console.error("Error al eliminar la relación empresa-servicio: ", error);
            res.status(500).send("Error al eliminar la relación empresa-servicio");
            return;
        }

        if (results.affectedRows > 0) {
            res.status(200).send("Relación empresa-servicio eliminada con éxito");
        } else {
            res.status(404).send("No se encontró la relación empresa-servicio");
        }
    });
});

//REGISTRA RELACION EMPRESA-SERVICIO

router.post("/empresa-servicio", (req, res) => {
    const { id_servicio, id_empresa, precio } = req.body;

    const sql = "INSERT INTO `empresa-servicio` (id_servicio, id_empresa, precio) VALUES (?, ?, ?)";

    connection.query(sql, [id_servicio, id_empresa, precio], (error, results) => {
        if (error) {
            console.error("Error al registrar la relación empresa-servicio: ", error);
            res.status(500).send("Error al registrar la relación empresa-servicio");
            return;
        }

        res.status(200).send("Relación empresa-servicio registrada con éxito");
    });
});


//buscador
router.get("/empresas-default", (req, res) => {
    const sql =
    "SELECT e.nombre_empresa, MAX(e.descripcion_empresa) AS descripcion_empresa, e.id_empresa, MAX(c.nombre_categoria) AS nombre_categoria FROM empresas AS e INNER JOIN `empresa-servicio` AS es ON e.id_empresa = es.id_empresa INNER JOIN servicios AS s ON s.id_servicio = es.id_servicio INNER JOIN categorias AS c ON c.id_categoria = s.id_categoria_servicio GROUP BY e.nombre_empresa, e.id_empresa";
    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error al obtener empresas: ", error);
            res.status(500).send("Error al obtener empresas");
            return;
        }

        res.json(results);
    });
});

module.exports = router;
