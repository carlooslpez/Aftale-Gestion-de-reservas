const express = require("express");
const router = express.Router();
const connection = require("../db");

// Mostrar todos los horarios_empresas
router.get("/horarios_empresas", (req, res) => {
    const sql = "SELECT * FROM horarios_empresas";

    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error al obtener horarios_empresas: ", error);
            res.status(500).send("Error al obtener horarios_empresas");
            return;
        }

        res.json(results);
    });
});

//Mostrar todos los horarios de una empresa
router.get("/horarios_empresas/empresa/:id_empresa", (req, res) => {
    const idEmpresa = req.params.id_empresa;

    const sql =
        "SELECT he.dia_semana_horario, he.hora_apertura, he.hora_cierre, he.inicio_descanso, he.fin_descanso, emp.nombre_empresa FROM horarios_empresas he INNER JOIN empresas emp ON he.id_empresa = emp.id_empresa WHERE emp.id_empresa = ?";

    connection.query(sql, [idEmpresa], (error, results) => {
        if (error) {
            console.error("Error al obtener horarios_empresas: ", error);
            res.status(500).send("Error al obtener horarios_empresas");
            return;
        }

        res.json(results);
    });
});

//Agregar horarios a una empresa

router.post("/horarios_empresas/agregar", (req, res) => {
    const {
        id_empresa,
        dia_semana_horario,
        hora_apertura,
        hora_cierre,
        inicio_descanso,
        fin_descanso,
    } = req.body;

    const sql =
        "INSERT INTO horarios_empresas (id_empresa, dia_semana_horario, hora_apertura, hora_cierre, inicio_descanso, fin_descanso) VALUES (?, ?, ?, ?, ?, ?)";

    connection.query(
        sql,
        [
            id_empresa,
            dia_semana_horario,
            hora_apertura,
            hora_cierre,
            inicio_descanso,
            fin_descanso,
        ],
        (error, result) => {
            if (error) {
                console.error("Error al agregar horario a la empresa: ", error);
                res.status(500).send("Error al agregar horario a la empresa");
                return;
            }

            res.json({ message: "Horario agregado correctamente" });
        }
    );
});

//Modificar el horario

router.post("/horarios_empresas/modificar/:id_horario", (req, res) => {
    const idHorario = req.params.id_horario;
    const {
        dia_semana_horario,
        hora_apertura,
        hora_cierre,
        inicio_descanso,
        fin_descanso,
    } = req.body;

    const sql =
        "UPDATE horarios_empresas SET dia_semana_horario = ?, hora_apertura = ?, hora_cierre = ?, inicio_descanso = ?, fin_descanso = ? WHERE id_horario = ?";

    connection.query(
        sql,
        [
            dia_semana_horario,
            hora_apertura,
            hora_cierre,
            inicio_descanso,
            fin_descanso,
            idHorario,
        ],
        (error, result) => {
            if (error) {
                console.error(
                    "Error al modificar el horario de la empresa: ",
                    error
                );
                res.status(500).send(
                    "Error al modificar el horario de la empresa"
                );
                return;
            }

            res.json({ message: "Horario modificado correctamente" });
        }
    );
});

//Borrar horario

router.post("/horarios_empresas/borrar/", (req, res) => {

    const {
        id_empresa,
        horario,
    } = req.body;


    const sql = "DELETE FROM horarios_empresas WHERE id_empresa = ? AND dia_semana_horario = ?";

    connection.query(sql, [id_empresa,horario], (error, result) => {
        if (result){
            console.log("horario borrado")
        }
        if (error) {
            console.error("Error al borrar el horario: ", error);
            res.status(500).send("Error al borrar el horario");
            return;
        }

        res.json({ message: "Horario borrado correctamente" });
    });
});

module.exports = router;
