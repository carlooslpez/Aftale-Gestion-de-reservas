const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const usuariosRouter = require("./routes/usuarios");
const empresasRouter = require("./routes/empresas");
const categoriasRouter = require("./routes/categorias");
const serviciosRouter = require("./routes/servicios");
const facturasRouter = require("./routes/facturas");
const reservasRouter = require("./routes/reservas");
const empresaservicioRouter = require("./routes/empresa_servicio");
const horariosempresasRouter = require("./routes/horario_empresas");
const multer = require("multer");

const connection = require("./db");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Especifica la carpeta de destino donde se guardarán los archivos
    cb(null, "./img");
  },
  filename: function (req, file, cb) {
    // Genera un nombre único para el archivo
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    // Establece el nombre del archivo
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.originalname.split(".").pop());
  },
});

const upload = multer({ storage: storage });

// Montar las rutas
app.use("/api", usuariosRouter);
app.use("/api", empresasRouter);
app.use("/api", categoriasRouter);
app.use("/api", serviciosRouter);
app.use("/api", facturasRouter);
app.use("/api", reservasRouter);
app.use("/api", empresaservicioRouter);
app.use("/api", horariosempresasRouter);

// Ruta para subir foto con Multer
app.post("/registrar_foto", upload.single("foto"), (req, res) => {
  // Aquí puedes acceder al archivo subido utilizando req.file
  // Realiza las operaciones necesarias con el archivo, como guardarlo en la base de datos o realizar alguna validación

  res.status(201).json({ message: "Foto subida correctamente" });
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));
