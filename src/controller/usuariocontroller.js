//usuariocontroller.js
const model = require ('../model/usuariomodel');
const { validacionusuario, validarusuario } = require('../middleware/validarusuario');
const { actualizarusuariovalidado, validarusuarioactualizado } = require('../middleware/validarusuarioactualizado');

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;  // Define el número de rondas para bcrypt

// Rutas del controlador
router.get('/', listar_usuario);
router.get('/:id_usuario', buscarPorId);
router.post('/', validacionusuario(), validarusuario, crear_usuario);
router.put('/:id_usuario', actualizarusuariovalidado(), validarusuarioactualizado, actualizar_usuario);
router.delete('/:id_usuario', eliminar_usuario);

// Listar todos los usuarios
async function listar_usuario(req, res) {
    console.log('Listar usuarios'); 
    try {
        const usuarios = await model.findAll();  
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Buscar usuario por ID
async function buscarPorId(req, res) {
    console.log('buscar usuario por id'); 
    const { id_usuario } = req.params;
    try {
        const usuario = await model.findById(id_usuario);  
        res.status(200).json(usuario);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Crear un nuevo usuario
async function crear_usuario(req, res) {
    console.log('crear usuario nuevo'); 
    const { id_rol, dni, email, pass } = req.body;

    // Validación básica
    if (!dni || !email || !pass) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Hashear la contraseña
        const hashedPass = await bcrypt.hash(pass, saltRounds);

        // Crear el usuario con la contraseña hasheada
        const result = await model.create(id_rol || 1, dni, email, hashedPass);  
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un usuario
async function actualizar_usuario(req, res) {
    console.log('actualizar usuario'); 
    const { id_usuario } = req.params;
    const { id_rol, dni, email, pass } = req.body;

    // Validación básica
    if (!dni || !email || !pass) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios para actualizar' });
    }

    try {
        // Hashear la nueva contraseña
        const hashedPass = await bcrypt.hash(pass, saltRounds);

        // Actualizar el usuario con la nueva contraseña hasheada
        const result = await model.update(id_usuario, id_rol || 1, dni, email, hashedPass);  
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Eliminar un usuario
async function eliminar_usuario(req, res) {
    console.log('eliminar usuario'); 
    const { id_usuario } = req.params;
    try {
        const result = await model.delete(id_usuario);  
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = router;