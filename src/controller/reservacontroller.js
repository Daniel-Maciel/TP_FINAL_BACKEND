//reservacontroller.js
const Reserva = require('../model/reservamodel');
const express = require('express');
const router = express.Router();

// Rutas del controlador
router.get('/', listar_reserva);
router.get('/:id_reserva', buscarPorId);
router.post('/', crear_reserva);
router.put('/:id_reserva', actualizar_reserva);
router.put('/cancelar/:id_reserva', cancelar_reserva);
router.delete('/:id_reserva', eliminar_reserva);


// Listar todas las reservas
async function listar_reserva(req, res) {
    console.log('Listar reservas');
    try {
        const reservas = await Reserva.findAll();
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Buscar reserva por ID
async function buscarPorId(req, res) {
    console.log('Buscar reserva por ID');
    const { id_reserva } = req.params;
    try {
        const reserva = await Reserva.findById(id_reserva);
        res.status(200).json(reserva);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Crear una nueva reserva
async function crear_reserva(req, res) {
    console.log('Crear reserva');
    const { id_usuario, id_vuelo, monto, metodo_pago, estado, id_asiento } = req.body;

    // Validación básica
    if (!id_usuario || !id_vuelo || !monto || !metodo_pago || !id_asiento) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await Reserva.create(id_usuario, id_vuelo, monto, metodo_pago, estado, id_asiento);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar una reserva
async function actualizar_reserva(req, res) {
    console.log('Actualizar reserva');
    const { id_reserva } = req.params;
    const { id_usuario, id_vuelo, monto, metodo_pago, estado, id_asiento } = req.body;

    // Validación básica
    if (!id_usuario || !id_vuelo || !monto || !metodo_pago || !estado || !id_asiento) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios para actualizar' });
    }

    try {
        const result = await Reserva.update(id_reserva, id_usuario, id_vuelo, monto, metodo_pago, estado, id_asiento);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Método para cancelar una reserva
async function cancelar_reserva(req, res) {
    const { id_reserva } = req.params;

    try {
        const result = await model.cancelarReserva(id_reserva);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

// Eliminar una reserva
async function eliminar_reserva(req, res) {
    console.log('Eliminar reserva');
    const { id_reserva } = req.params;
    try {
        const result = await Reserva.delete(id_reserva);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = router;
