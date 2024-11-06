//personacontroller.js
const model = require ('../model/personamodel');
const { validarpersona, validarcampos } = require('../middleware/validarpersona');
const { actualizarpersonavalidada, validaractualizacionpersona } = require('../middleware/validarpersonaactualizada');

const express = require('express');
const router = express.Router();

router.get('/', listar_persona);
router.get('/:dni', buscarPorDni);
router.post('/', validarpersona(), validarcampos, crear_persona);
router.put('/:dni', actualizarpersonavalidada(), validaractualizacionpersona, actualizar_persona);
router.delete('/:dni', eliminar_persona);

// Listar todas las personas
// Ruta para obtener todas las personas


async function listar_persona(req, res) {
    console.log('Listar personas');  
   try {
        const results = await model.findAll();
         res.status(200).json(results);
     } catch (err) {
         res.status(500).json({ error: err.message });
     }
}

// Buscar persona por DNI
async function buscarPorDni(req, res) {
    console.log('buscar por dni');  
    try {
        const result = await model.findByDni(dni); 
        if (!result) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Crear nueva persona
async function crear_persona(req, res) {
    console.log('crear persona'); 
    const { dni, nombre, apellido, direccion, telefono } = req.body;

    // Validación básica
    if (!dni || !nombre || !apellido || !direccion) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        await model.create(dni, nombre, apellido, direccion, telefono);
        res.status(201).json({ message: 'Persona creada correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Actualizar persona por DNI
async function actualizar_persona(req, res) {
    console.log('actualizar persona'); 
    const { dni } = req.params;
    const { nombre, apellido, direccion, telefono } = req.body;

    // Validación básica
    if (!nombre || !apellido || !direccion) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios para actualizar' });
    }

    try {
        await model.update(dni, nombre, apellido, direccion, telefono);
        res.status(200).json({ message: 'Persona actualizada correctamente' });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ error: error.message });
    }
}

// Eliminar persona por DNI
async function eliminar_persona(req, res) {
    console.log('eliminar persona'); 
    const { dni } = req.params;
    try {
        await model.delete(dni);
        res.status(200).json({ message: 'Persona eliminada correctamente' });
    } catch (err) {
        const statusCode = err.statusCode || 500;
        res.status(statusCode).json({ error: err.message });
    }
}

module.exports = router;