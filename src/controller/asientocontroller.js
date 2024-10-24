//asientocontroller.js
const Asiento = require('../model/asientomodel');
const express = require('express');
const router = express.Router();

// Rutas del controlador
router.get('/', listar_asientos);
router.get('/:id_asiento', buscarPorId);
router.post('/', crear_asiento);
router.put('/:id_asiento', actualizar_asiento);
router.delete('/:id_asiento', eliminar_asiento);

// Listar todos los asientos
async function listar_asientos(req, res) {
    console.log('Listar asientos');
    try {
        const asientos = await Asiento.findAll();
        res.status(200).json(asientos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Buscar asiento por ID
async function buscarPorId(req, res) {
    console.log('Buscar asiento por ID');
    const { id_asiento } = req.params;
    try {
        const asiento = await Asiento.findById(id_asiento);
        res.status(200).json(asiento);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Crear un nuevo asiento
async function crear_asiento(req, res) {
    console.log('Crear asiento');
    const { id_vuelo, numero_asiento, clase, estado } = req.body;

    // Validación básica
    if (!id_vuelo || !numero_asiento || !clase) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await Asiento.create(id_vuelo, numero_asiento, clase, estado);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un asiento
async function actualizar_asiento(req, res) {
    console.log('Actualizar asiento');
    const { id_asiento } = req.params;
    const { id_vuelo, numero_asiento, clase, estado } = req.body;

    // Validación básica
    if (!id_vuelo || !numero_asiento || !clase || !estado) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios para actualizar' });
    }

    try {
        const result = await Asiento.update(id_asiento, id_vuelo, numero_asiento, clase, estado);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Eliminar un asiento
async function eliminar_asiento(req, res) {
    console.log('Eliminar asiento');
    const { id_asiento } = req.params;
    try {
        const result = await Asiento.delete(id_asiento);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = router;
