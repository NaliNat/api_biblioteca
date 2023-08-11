// controller para usuarios usando usuarioModel.js
const Usuario = require("../models/usuarioModel");

// Context from Function c:/Users/barri/Desktop/CURSOS/Curso_FullStack_Node.js_y_React_ANDEN/Clase 9/api_biblioteca/src/controllers/usuarioController.js:getAllUsuarios
exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// Context from Function c:/Users/barri/Desktop/CURSOS/Curso_FullStack_Node.js_y_React_ANDEN/Clase 9/api_biblioteca/src/controllers/usuarioController.js:getUsuarioById
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// Context from Function c:/Users/barri/Desktop/CURSOS/Curso_FullStack_Node.js_y_React_ANDEN/Clase 9/api_biblioteca/src/controllers/usuarioController.js:createUsuario
exports.createUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.create(req.body);
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

// Context from Function c:/Users/barri/Desktop/CURSOS/Curso_FullStack_Node.js_y_React_ANDEN/Clase 9/api_biblioteca/src/controllers/usuarioController.js:updateUsuario
exports.updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

// Context from Function c:/Users/barri/Desktop/CURSOS/Curso_FullStack_Node.js_y_React_ANDEN/Clase 9/api_biblioteca/src/controllers/usuarioController.js:deleteUsuario
exports.deleteUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.id;

    const usuarioEliminado = await Usuario.findByIdAndRemove(usuarioId);

    res.status(200).json(usuarioEliminado);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};
