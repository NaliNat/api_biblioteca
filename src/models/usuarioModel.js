// crear un modelo de usuario con mongoose
require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const UsuarioSchema = new mongoose.Schema(
  {
    nombre: String,
    apellido: String,
    email: String,
    password: String,
  },
  { collection: "usuarios" }
);

const Usuario = mongoose.model("Usuario", UsuarioSchema);

module.exports = Usuario;
