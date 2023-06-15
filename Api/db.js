const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bbdd_tfg_final",
});

connection.connect((error) => {
    if (error) {
        console.error("Error al conectar con la base de datos: ", error);
        return;
    }

    console.log("Conexión a la base de datos establecida");
});

module.exports = connection;
