//avioncontroller.js
const Avion = require('../model/avionmodel');
//const model = require ('../model/avionmodel');

const express = require('express');
const router = express.Router();

// Rutas del controlador
router.get('/', listar_avion);
router.get('/:id_avion', buscarPorId);
router.post('/', crear_avion);
router.put('/:id_avion', actualizar_avion);
router.delete('/:id_avion', eliminar_avion);

// Listar todos los aviones
async function listar_avion(req, res) {
    console.log('Listar aviones'); 
    try {
        const aviones = await Avion.findAll();
        res.status(200).json(aviones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Buscar avión por ID
async function buscarPorId(req, res) {
    console.log('buscar por id avion'); 
    const { id_avion } = req.params;
    try {
        const avion = await Avion.findById(id_avion);
        res.status(200).json(avion);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Crear un nuevo avión
async function crear_avion(req, res) {
    console.log('crear avion nuevo'); 
    const { modelo, capacidad, aerolinea } = req.body;

    // Validación básica
    if (!modelo || !capacidad || !aerolinea) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await Avion.create(modelo, capacidad, aerolinea);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un avión
async function actualizar_avion(req, res) {
    console.log('actualizar avion'); 
    const { id_avion } = req.params;
    const { modelo, capacidad, aerolinea } = req.body;

    // Validación básica
    if (!modelo || !capacidad || !aerolinea) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios para actualizar' });
    }

    try {
        const result = await Avion.update(id_avion, modelo, capacidad, aerolinea);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Eliminar un avión
async function eliminar_avion(req, res) {
    console.log('eliminar avion'); 
    const { id_avion } = req.params;
    try {
        const result = await Avion.delete(id_avion);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = router;
