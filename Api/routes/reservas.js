const express = require("express");
const router = express.Router();
const connection = require("../db");

//Mostrar reserva de empresa/usuario o cliente/usuario

router.post("/reservas", (req, res) => {
    const { esCliente, id } = req.body;

    let sql = "SELECT r.id_reserva, r.fecha_reserva, r.hora_reserva, r.comentario_reserva, r.id_servicio_reserva, ";

    if (esCliente) {
        // Si es cliente, obtenemos el nombre de la empresa donde hace la reserva
        sql += "e.nombre_empresa AS nombre_reserva, r.id_empresa_reserva as id_persona, u.nombre_usuario ";
        sql += "FROM reservas r ";
        sql += "INNER JOIN empresas e ON r.id_empresa_reserva = e.id_empresa ";
        sql += "INNER JOIN usuarios u ON r.id_usuario_reserva = u.id_usuario ";
        sql += "WHERE r.id_usuario_reserva = ? ";
    } else {
        // Si es empresa, obtenemos el nombre de usuario que realiza la reserva
        sql += "u.nombre_usuario AS nombre_reserva, r.id_usuario_reserva as id_persona, e.nombre_empresa ";
        sql += "FROM reservas r ";
        sql += "INNER JOIN usuarios u ON r.id_usuario_reserva = u.id_usuario ";
        sql += "INNER JOIN empresas e ON r.id_empresa_reserva = e.id_empresa ";
        sql += "WHERE r.id_empresa_reserva = ? ";
    }

    // Filtrar las reservas actuales y futuras
    sql += "AND r.fecha_reserva >= CURDATE() ";

    sql += "ORDER BY r.fecha_reserva, r.hora_reserva";

    connection.query(sql, [id], (error, results) => {
        if (error) {
            console.error("Error al obtener reservas: ", error);
            res.status(500).send("Error al obtener reservas");
            return;
        }

        res.json(results);
    });
});

//AÑADIR RESERVA //
router.post("/reservas/registrar", (req, res) => {
    const nuevaReserva = req.body;

    // Obtener el ID del usuario que hizo la reserva
    const idUsuarioReserva = nuevaReserva.id_usuario_reserva;
    const fecha_reserva = nuevaReserva.fecha_reserva;
    // Insertar la nueva reserva en la tabla de reservas
    const sql =
        "INSERT INTO reservas (fecha_reserva, hora_reserva, comentario_reserva, id_usuario_reserva, id_empresa_reserva, id_servicio_reserva) VALUES (?, ?, ?, ?, ?, ?)";

    connection.query(
        sql,
        [
            fecha_reserva,
            nuevaReserva.hora_reserva,
            nuevaReserva.comentario_reserva,
            idUsuarioReserva,
            nuevaReserva.id_empresa_reserva,
            nuevaReserva.id_servicio_reserva,
        ],
        (error, result) => {
            if (error) {
                console.error("Error al agregar reserva: ", error);
                res.status(500).send("Error al agregar reserva");
                return;
            }

            res.status(201).json({ id_reserva: result.insertId });
        }
    );
});


// Borrar reservas
router.delete("/reservas/:id_reserva", (req, res) => {
    const idReserva = req.params.id_reserva;

    // Eliminar facturas relacionadas
    const deleteFacturas = "DELETE FROM facturas WHERE id_reserva_factura = ?";
    connection.query(deleteFacturas, [idReserva], (error, result) => {
        if (error) {
            console.error("Error al borrar facturas: ", error);
            res.status(500).send("Error al borrar facturas");
            return;
        }

        // Eliminar reserva
        const deleteReserva = "DELETE FROM reservas WHERE id_reserva = ?";
        connection.query(deleteReserva, [idReserva], (error, result) => {
            if (error) {
                console.error("Error al borrar reserva: ", error);
                res.status(500).send("Error al borrar reserva");
                return;
            }

            if (result.affectedRows === 0) {
                res.status(404).send("Reserva no encontrada");
                return;
            }

            res.send("Reserva borrada correctamente");
        });
    });
});

module.exports = router;
