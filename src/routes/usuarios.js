// crear una api de usuarios con express

// Context from Code Snippet c:/Users/barri/Desktop/CURSOS/Curso_FullStack_Node.js_y_React_ANDEN/Clase 9/api_biblioteca/src/routes/libros.js
const express = require("express");
const router = express.Router();

const {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} = require("../controllers/usuarioController");

// Importamos la librería para validar scopes
const { requiredScopes } = require("express-oauth2-jwt-bearer");

// Ruta para obtener todos los usuarios
router.get("/", requiredScopes("read:usuarios"), getAllUsuarios);

// Ruta para obtener un usuario por id
router.get("/:id", requiredScopes("read:usuarios"), getUsuarioById);

// Ruta para crear un nuevo usuario
router.post("/", requiredScopes("write:usuarios"), createUsuario);

// Ruta para actualizar un usuario existente
router.put("/:id", requiredScopes("write:usuarios"), updateUsuario);

// Ruta para eliminar un usuario
router.delete("/:id", requiredScopes("write:usuarios"), deleteUsuario);

module.exports = router;
