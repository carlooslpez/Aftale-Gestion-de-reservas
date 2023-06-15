const express = require("express");
const router = express.Router();
const connection = require("../db");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Mostrar todas las empresas
router.get("/empresas", (req, res) => {
    const sql = "SELECT * FROM empresas";

    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error al obtener empresas: ", error);
            res.status(500).send("Error al obtener empresas");
            return;
        }

        res.json(results);
    });
});

//  Información de la empresa con ID: **** ?
router.get("/empresas/:id_empresa", (req, res) => {
    const empresaId = req.params.id_empresa;
    const sql =
        "SELECT nombre_empresa, cif_empresa, email_empresa, email_recuperacion_empresa, ciudad_empresa, direccion_empresa, telefono1_empresa,telefono2_empresa, telefono3_empresa, pass_empresa, web_empresa,descripcion_empresa, fecha_creacion_empresa FROM empresas WHERE id_empresa = ?";

    connection.query(sql, [empresaId], (error, results) => {
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
});

//  Buscar nombre empresa: **** ?
router.get("/empresas/nombre/:nombre_empresa", (req, res) => {
    const nombreEmpresa = req.params.nombre_empresa;
    const sql =
        "SELECT id_empresa, nombre_empresa, cif_empresa, email_empresa, email_recuperacion_empresa, ciudad_empresa, direccion_empresa, telefono1_empresa,telefono2_empresa, telefono3_empresa, pass_empresa, web_empresa,descripcion_empresa, fecha_creacion_empresa FROM empresas WHERE nombre_empresa LIKE ?";

    connection.query(sql, [`%${nombreEmpresa}%`], (error, results) => {
        if (error) {
            console.error("Error al obtener empresas por nombre: ", error);
            res.status(500).send("Error al obtener empresas por nombre");
            return;
        }

        if (results.length === 0) {
            res.status(404).send("Empresas no encontradas");
            return;
        }

        res.json(results);
    });
});

// INICIAR SEION
function verificarCredenciales(email_usuario, contrasena) {
    const sql =
        "SELECT * FROM empresas WHERE email_empresa = ? AND pass_empresa = ?";
    const values = [email_usuario, contrasena];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            // Verificar si se encontró un email con las credenciales proporcionadas
            resolve(result.length > 0);
        });
    });
}

function obtenerInformacionEmpresa(email_usuario) {
    const sql = "SELECT * FROM empresas WHERE email_empresa = ?";
    const values = [email_usuario];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            if (result.length === 0) {
                reject("email no encontrado");
                return;
            }

            const emailEncontrado = result[0];

            const informacionEmpresa = {
                id: emailEncontrado.id_empresa,
                nombre: emailEncontrado.nombre_empresa,
                Cif: emailEncontrado.cif_empresa,
                email_usuario: emailEncontrado.email_empresa,
                emailRecuperacion: emailEncontrado.email_recuperacion_empresa,
                ciudad: emailEncontrado.ciudad_empresa,
                direccion: emailEncontrado.direccion_empresa,
                telefono: emailEncontrado.telefono1_empresa,
                telefono2: emailEncontrado.telefono2_empresa,
                telefono3: emailEncontrado.telefono3_empresa,
                pass: emailEncontrado.pass_empresa,
                web: emailEncontrado.web_empresa,
                descripcion: emailEncontrado.descripcion_empresa,
                fechaNcimiento: emailEncontrado.fecha_creacion_empresa,

            };

            resolve(informacionEmpresa);
        });
    });
}

router.post("/iniciar_sesion_empresa", async (req, res) => {
    const { email_usuario, contrasena } = req.body;

    try {
        const credencialesValidas = await verificarCredenciales(
            email_usuario,
            contrasena
        );

        if (credencialesValidas) {
            const informacionEmpresa = await obtenerInformacionEmpresa(
                email_usuario
            );
            res.json(informacionEmpresa);
        } else {
            res.status(401).send("Credenciales inválidas");
        }
    } catch (error) {
        console.error("Error al verificar las credenciales: ", error);
        res.status(500).send("Error al verificar las credenciales");
    }
});

//  Información de la empresa con ID: **** ?
router.get("/empresas/:id_empresa", (req, res) => {
    const empresaId = req.params.id_empresa;
    const sql =
        "SELECT nombre_empresa, cif_empresa, email_empresa, email_recuperacion_empresa, ciudad_empresa, direccion_empresa, telefono1_empresa,telefono2_empresa, telefono3_empresa, pass_empresa, web_empresa,descripcion_empresa, fecha_creacion_empresa FROM empresas WHERE id_empresa = ?";

    connection.query(sql, [empresaId], (error, results) => {
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
});

//MODIFICA LOS DATOS DIGITADOS, SI LOS DEJAS SIN RELLENAR SE MANTIENEN LOS DATOS ANTIGUOS
router.put("/empresas/:id_empresa", (req, res) => {
    const empresaId = req.params.id_empresa;
    const {
        nombre_empresa,
        cif_empresa,
        email_empresa,
        email_recuperacion_empresa,
        ciudad_empresa,
        direccion_empresa,
        telefono1_empresa,
        telefono2_empresa,
        telefono3_empresa,
        web_empresa,
        descripcion_empresa,
        fecha_creacion_empresa,

    } = req.body;

    const sql = `UPDATE empresas SET 
        nombre_empresa = IFNULL(?, nombre_empresa),
        cif_empresa = IFNULL(?, cif_empresa),
        email_empresa = IFNULL(?, email_empresa),
        email_recuperacion_empresa = IFNULL(?, email_recuperacion_empresa),
        ciudad_empresa = IFNULL(?, ciudad_empresa),
        direccion_empresa = IFNULL(?, direccion_empresa),
        telefono1_empresa = IFNULL(?, telefono1_empresa),
        telefono2_empresa = IFNULL(?, telefono2_empresa),
        telefono3_empresa = IFNULL(?, telefono3_empresa),
        web_empresa = IFNULL(?, web_empresa),
        descripcion_empresa = IFNULL(?, descripcion_empresa),
        fecha_creacion_empresa = IFNULL(?, fecha_creacion_empresa)
        
        WHERE id_empresa = ?`;

    const values = [
        nombre_empresa,
        cif_empresa,
        email_empresa,
        email_recuperacion_empresa,
        ciudad_empresa,
        direccion_empresa,
        telefono1_empresa,
        telefono2_empresa,
        telefono3_empresa,
        web_empresa,
        descripcion_empresa,
        fecha_creacion_empresa,

        empresaId,
    ];

    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al actualizar empresa: ", error);
            res.status(500).send("Error al actualizar empresa");
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).send("Empresa no encontrada");
            return;
        }

        res.status(200).send("Empresa actualizada correctamente");
    });
});

//REGISTRAR EMPRESA

router.post("/registrar_empresa", async (req, res) => {
    const {
        nombre_usuario,
        cif_empresa,
        email_usuario,
        pass_usuario,
        email_recuperacion_usuario,
        ciudad_empresa,
        direccion_empresa,
        telefono_usuario,
        telefono2_empresa,
        telefono3_empresa,
        web_empresa,
        descripcion_empresa,
        fecha_creacion_usuario,
    } = req.body;

    const checkSql =
        "SELECT * FROM empresas WHERE email_empresa = ? OR nombre_empresa = ?";
    connection.query(
        checkSql,
        [email_usuario, nombre_usuario],
        (checkError, checkResult) => {
            if (checkError) {
                console.error("Error al verificar duplicados: ", checkError);
                res.status(500).send("Error al añadir empresa");
                return;
            }

            if (checkResult.length > 0) {
                const duplicateFields = [];
                checkResult.forEach((row) => {
                    if (row.email_empresa === email_usuario) {
                        duplicateFields.push("email_usuario");
                    }
                    if (row.nombre_empresa === nombre_usuario) {
                        duplicateFields.push("nombre_usuario");
                    }

                    if (row.cif_empresa === cif_empresa) {
                        duplicateFields.push("cif_empresa");
                    }

                    if (row.direccion_empresa === direccion_empresa) {
                        duplicateFields.push("direccion_empresa");
                    }

                    if (row.web_empresa === web_empresa) {
                        duplicateFields.push("web_empresa");
                    }
                    // Agrega aquí las demás condiciones para las columnas correspondientes
                });
                res.status(409).json({
                    error: "Los siguientes campos ya existen en la base de datos:",
                    duplicateFields,
                });
                return;
            }

            const insertSql =
                "INSERT INTO empresas (nombre_empresa, cif_empresa, email_empresa, pass_empresa, email_recuperacion_empresa, ciudad_empresa, direccion_empresa, telefono1_empresa, telefono2_empresa, telefono3_empresa, web_empresa, descripcion_empresa, fecha_creacion_empresa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            connection.query(
                insertSql,
                [
                    nombre_usuario,
                    cif_empresa,
                    email_usuario,
                    pass_usuario,
                    email_recuperacion_usuario,
                    ciudad_empresa,
                    direccion_empresa,
                    telefono_usuario,
                    telefono2_empresa,
                    telefono3_empresa,
                    web_empresa,
                    descripcion_empresa,
                    fecha_creacion_usuario,
                ],
                (insertError, result) => {
                    if (insertError) {
                        console.error("Error al añadir empresa: ", insertError);
                        res.status(500).send("Error al añadir empresa");
                        return;
                    }

                    const empresaId = result.insertId; // Obtener el ID de la empresa insertada

                    res.status(202).json({ empresaId });
                }
            );
        }
    );
});


//Registrar FotoEmpresa
// Ruta para registrar una foto en la tabla empresas
router.post("/registrar_foto", upload.single("foto"), (req, res) => {
    const { id_empresa } = req.body;
    const foto = req.file;

    if (!foto) {
        res.status(400).send("No se proporcionó ninguna foto");
        return;
    }

    const sql = "UPDATE empresas SET foto_empresa = ? WHERE id_empresa = ?";

    connection.query(sql, [foto.buffer, id_empresa], (error, result) => {
        if (error) {
            console.error("Error al registrar la foto: ", error);
            res.status(500).send("Error al registrar la foto");
            return;
        }

        res.status(201).json({ message: "Foto registrada correctamente" });
    });
});


module.exports = router;
