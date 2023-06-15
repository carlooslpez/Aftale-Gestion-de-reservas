const express = require("express");
const router = express.Router();
const connection = require("../db");

// Mostrar todos los usuarios
router.get("/usuarios", (req, res) => {
    const sql = "SELECT * FROM usuarios";

    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error al obtener usuarios: ", error);
            res.status(500).send("Error al obtener usuarios");
            return;
        }

        res.json(results);
    });
});

//  Información del usuario con ID: **** ?
// ENCRIPTARLO
router.get("/usuarios/:id_usuario", (req, res) => {
    const userId = req.params.id_usuario;
    const sql =
        "SELECT nombre_usuario, apellidos_usuario, email_usuario, pass_usuario, fecha_nacimiento_usuario, telefono_usuario, email_recuperacion_usuario FROM usuarios WHERE id_usuario = ?";

    connection.query(sql, [userId], (error, results) => {
        if (error) {
            console.error("Error al obtener usuario: ", error);
            res.status(500).send("Error al obtener usuario");
            return;
        }

        if (results.length === 0) {
            res.status(404).send("Usuario no encontrado");
            return;
        }

        res.json(results[0]);
    });
});

/*const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const key = 'clave-secreta';

const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

const decrypt = (text) => {
    const [ivHex, encryptedHex] = text.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString();
};

router.get("/usuarios/:id_usuario", (req, res) => {
    const userId = req.params.id_usuario;
    const sql =
        encrypt("SELECT nombre_usuario, apellidos_usuario, email_usuario, pass_usuario, fecha_nacimiento_usuario, telefono_usuario, email_recuperacion_usuario FROM usuarios WHERE id_usuario = ?");

    connection.query(decrypt(sql), [userId], (error, results) => {
        if (error) {
            console.error(decrypt("Error al obtener usuario: "), error);
            res.status(500).send(decrypt("Error al obtener usuario"));
            return;
        }

        if (results.length === 0) {
            res.status(404).send(decrypt("Usuario no encontrado"));
            return;
        }

        res.json(results[0]);
    });
});*/



// Actualizar usuario tienes que rellenar TODOS los campos
router.put("/usuarios/:id_usuario", (req, res) => {
    const userId = req.params.id_usuario;
    const {
        nombre_usuario,
        apellidos_usuario,
        email_usuario,
        pass_usuario,
        fecha_nacimiento_usuario,
        telefono_usuario,
        email_recuperacion_usuario,
    } = req.body;
    const sql =
        "UPDATE usuarios SET nombre_usuario=?, apellidos_usuario=?, email_usuario=?, pass_usuario=?, fecha_nacimiento_usuario=?, telefono_usuario=?, email_recuperacion_usuario=? WHERE id_usuario=?";

    connection.query(
        sql,
        [
            nombre_usuario,
            apellidos_usuario,
            email_usuario,
            pass_usuario,
            fecha_nacimiento_usuario,
            telefono_usuario,
            email_recuperacion_usuario,
            userId,
        ],
        (error, result) => {
            if (error) {
                console.error("Error al actualizar usuario: ", error);
                res.status(500).send("Error al actualizar usuario");
                return;
            }

            res.json(result);
        }
    );
});

//CAMBIAR DATOS DE USUARIOS SIN rellenar TODOS los datos, solo los que digites
router.put("/usuarios/cambiardatos/:id_usuario", (req, res) => {
    const userId = req.params.id_usuario;
    const {
        nombre_usuario,
        apellidos_usuario,
        email_usuario,
        pass_usuario,
        fecha_nacimiento_usuario,
        telefono_usuario,
        email_recuperacion_usuario,
    } = req.body;

    let sql = "UPDATE usuarios SET ";
    const values = [];

    if (nombre_usuario !== undefined) {
        sql += "nombre_usuario = ?, ";
        values.push(nombre_usuario);
    }

    if (apellidos_usuario !== undefined) {
        sql += "apellidos_usuario = ?, ";
        values.push(apellidos_usuario);
    }

    if (email_usuario !== undefined) {
        sql += "email_usuario = ?, ";
        values.push(email_usuario);
    }

    if (pass_usuario !== undefined) {
        sql += "pass_usuario = ?, ";
        values.push(pass_usuario);
    }

    if (fecha_nacimiento_usuario !== undefined) {
        sql += "fecha_nacimiento_usuario = ?, ";
        values.push(fecha_nacimiento_usuario);
    }

    if (telefono_usuario !== undefined) {
        sql += "telefono_usuario = ?, ";
        values.push(telefono_usuario);
    }

    if (email_recuperacion_usuario !== undefined) {
        sql += "email_recuperacion_usuario = ?, ";
        values.push(email_recuperacion_usuario);
    }

    // Eliminar la coma final si hay campos a actualizar
    if (values.length > 0) {
        sql = sql.slice(0, -2);
        sql += " ";
    } else {
        res.status(400).send("No se proporcionaron datos para actualizar");
        return;
    }

    sql += "WHERE id_usuario = ?";
    values.push(userId);

    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al actualizar usuario: ", error);
            res.status(500).send("Error al actualizar usuario");
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).send("Usuario no encontrado");
            return;
        }

        res.status(200).send("Usuario actualizado correctamente");
    });
});

// INICIAR SEsION Usuario
function verificarCredenciales(email_usuario, contrasena) {
    const sql =
        "SELECT * FROM usuarios WHERE email_usuario = ? AND pass_usuario = ?";
    const values = [email_usuario, contrasena];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            // Verificar si se encontró un usuario con las credenciales proporcionadas
            resolve(result.length > 0);
        });
    });
}

function obtenerInformacionUsuario(email_usuario) {
    const sql = "SELECT * FROM usuarios WHERE email_usuario = ?";
    const values = [email_usuario];

    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            if (result.length === 0) {
                reject("Usuario no encontrado");
                return;
            }

            const usuarioEncontrado = result[0];

            const informacionUsuario = {
                id: usuarioEncontrado.id_usuario,
                nombre: usuarioEncontrado.nombre_usuario,
                apellidos: usuarioEncontrado.apellidos_usuario,
                email: usuarioEncontrado.email_usuario,
                fechaNacimiento: usuarioEncontrado.fecha_nacimiento_usuario,
                telefono: usuarioEncontrado.telefono_usuario,
                emailRecuperacion: usuarioEncontrado.email_recuperacion_usuario,
            };

            resolve(informacionUsuario);
        });
    });
}

//INICIAR SESION
router.post("/iniciar_sesion", async (req, res) => {
    const { email_usuario, contrasena } = req.body;

    try {
        const credencialesValidas = await verificarCredenciales(
            email_usuario,
            contrasena
        );

        if (credencialesValidas) {
            const informacionUsuario = await obtenerInformacionUsuario(email_usuario);
            res.json(informacionUsuario);
        } else {
            res.status(401).send("Credenciales inválidas");
        }
    } catch (error) {
        console.error("Error al verificar las credenciales: ", error);
        res.status(500).send("Error al verificar las credenciales");
    }
});

//cambiar contraseña

router.put("/usuarios/cambiarcontrasena/:nombre_usuario", async (req, res) => {
    const username = req.params.nombre_usuario;
    const { oldPassword, newPassword } = req.body;

    try {
        // Verificar la contraseña antigua
        const isOldPasswordCorrect = await verificarContrasenaAntigua(
            username,
            oldPassword
        );

        if (isOldPasswordCorrect) {
            // Actualizar la contraseña en la base de datos
            const sql =
                "UPDATE usuarios SET pass_usuario = ? WHERE nombre_usuario = ?";
            connection.query(sql, [newPassword, username], (error, result) => {
                if (error) {
                    console.error("Error al actualizar contraseña: ", error);
                    res.status(500).send("Error al actualizar contraseña");
                    return;
                }

                res.json(result);
            });
        } else {
            // La contraseña antigua es incorrecta
            res.status(401).send("Contraseña antigua incorrecta");
        }
    } catch (error) {
        console.error("Error al verificar la contraseña antigua: ", error);
        res.status(500).send("Error al verificar la contraseña antigua");
    }
});

function verificarContrasenaAntigua(username, oldPassword) {
    return new Promise((resolve, reject) => {
        const sql =
            "SELECT pass_usuario FROM usuarios WHERE nombre_usuario = ?";
        connection.query(sql, [username], (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            if (result.length === 0) {
                resolve(false);
                return;
            }

            const actualPassword = result[0].pass_usuario;
            resolve(actualPassword === oldPassword);
        });
    });
}

//CAMBIAR DATOS DE USUARIOS
router.put("/usuarios/cambiardatos/:id_usuario", (req, res) => {
    const userId = req.params.id_usuario;
    const {
        nombre_usuario,
        apellidos_usuario,
        email_usuario,
        pass_usuario,
        fecha_nacimiento_usuario,
        telefono_usuario,
        email_recuperacion_usuario,
    } = req.body;

    let sql = "UPDATE usuarios SET ";
    const values = [];

    if (nombre_usuario !== undefined) {
        sql += "nombre_usuario = ?, ";
        values.push(nombre_usuario);
    }

    if (apellidos_usuario !== undefined) {
        sql += "apellidos_usuario = ?, ";
        values.push(apellidos_usuario);
    }

    if (email_usuario !== undefined) {
        sql += "email_usuario = ?, ";
        values.push(email_usuario);
    }

    if (pass_usuario !== undefined) {
        sql += "pass_usuario = ?, ";
        values.push(pass_usuario);
    }

    if (fecha_nacimiento_usuario !== undefined) {
        sql += "fecha_nacimiento_usuario = ?, ";
        values.push(fecha_nacimiento_usuario);
    }

    if (telefono_usuario !== undefined) {
        sql += "telefono_usuario = ?, ";
        values.push(telefono_usuario);
    }

    if (email_recuperacion_usuario !== undefined) {
        sql += "email_recuperacion_usuario = ?, ";
        values.push(email_recuperacion_usuario);
    }

    // Eliminar la coma final si hay campos a actualizar
    if (values.length > 0) {
        sql = sql.slice(0, -2);
        sql += " ";
    } else {
        res.status(400).send("No se proporcionaron datos para actualizar");
        return;
    }

    sql += "WHERE id_usuario = ?";
    values.push(userId);

    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error("Error al actualizar usuario: ", error);
            res.status(500).send("Error al actualizar usuario");
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).send("Usuario no encontrado");
            return;
        }

        res.status(200).send("Usuario actualizado correctamente");
    });
});


//Registrar Usuario 

router.post("/usuarios", (req, res) => {
    const {
        nombre_usuario,
        apellidos_usuario,
        email_usuario,
        pass_usuario,
        fecha_nacimiento_usuario,
        telefono_usuario,
        email_recuperacion_usuario,
    } = req.body;

    const checkSql =
        "SELECT * FROM usuarios WHERE email_usuario = ? OR telefono_usuario = ? OR email_recuperacion_usuario = ?";
    connection.query(
        checkSql,
        [email_usuario, telefono_usuario, email_recuperacion_usuario],
        (checkError, checkResult) => {
            if (checkError) {
                console.error("Error al verificar duplicados: ", checkError);
                res.status(500).send("Error al añadir usuario");
                return;
            }

            if (checkResult.length > 0) {
                // Al menos un campo ya existe en la base de datos
                const duplicateFields = [];
                checkResult.forEach((row) => {
                    if (row.email_usuario === email_usuario) {
                        duplicateFields.push("email_usuario");
                    }
                    if (row.telefono_usuario === telefono_usuario) {
                        duplicateFields.push("telefono_usuario");
                    }
                    if (row.email_recuperacion_usuario === email_recuperacion_usuario) {
                        duplicateFields.push("email_recuperacion_usuario");
                    }
                });
                res.status(409).json({ error: "Los siguientes campos ya existen en la base de datos: ", duplicateFields });
                return;
            }

            // Insertar el nuevo usuario en la base de datos
            const insertSql =
                "INSERT INTO usuarios (nombre_usuario, apellidos_usuario, email_usuario, pass_usuario, fecha_nacimiento_usuario, telefono_usuario, email_recuperacion_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)";
            connection.query(
                insertSql,
                [
                    nombre_usuario,
                    apellidos_usuario,
                    email_usuario,
                    pass_usuario,
                    fecha_nacimiento_usuario,
                    telefono_usuario,
                    email_recuperacion_usuario,
                ],
                (insertError, result) => {
                    if (insertError) {
                        console.error("Error al añadir usuario: ", insertError);
                        res.status(500).send("Error al añadir usuario");
                        return;
                    }

                    res.status(202).json(result);
                }
            );
        }
    );
});





module.exports = router;
