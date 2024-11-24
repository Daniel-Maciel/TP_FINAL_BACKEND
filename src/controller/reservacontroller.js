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
// Listar todas las reservas con filtro opcional por estado
async function listar_reserva(req, res) {
    try {
        console.log('Parámetros recibidos:', req.query); // Muestra los parámetros recibidos
        console.log('Cabeceras recibidas:', req.headers); // Muestra las cabeceras

        // Obtener filtro de estado (si se proporciona)
        const { estado } = req.query;

        // Condición para la consulta
        const where = estado ? { estado } : {}; // Filtra por estado si existe

        // Consultar la base de datos
        const reservas = await Reserva.findAll({ where }); // Incluye el filtro
        res.status(200).json(reservas);
    } catch (error) {
        console.error('Error al listar reservas:', error.message);
        res.status(500).json({ error: 'Error al listar reservas.' });
    }
}

// Buscar reserva por ID
async function buscarPorId(req, res) {
    console.log('Buscar reserva por ID');
    const { id_reserva } = req.params;

    try {
        const reserva = await Reserva.findById(id_reserva);

        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        res.status(200).json(reserva);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar la reserva' });
    }
}

// Crear una nueva reserva
async function crear_reserva(req, res) {
    console.log('Crear reserva');
    const { id_usuario, id_vuelo, monto, metodo_pago, estado = 'pendiente', id_asiento } = req.body;

    // Validación básica
    if (!id_usuario || !id_vuelo || !monto || !metodo_pago || !id_asiento) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const nuevaReserva = await Reserva.create({
            id_usuario,
            id_vuelo,
            monto,
            metodo_pago,
            estado,
            id_asiento,
        });

        res.status(201).json({ message: 'Reserva creada con éxito', reserva: nuevaReserva });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la reserva' });
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
        const reservaActualizada = await Reserva.update(id_reserva, {
            id_usuario,
            id_vuelo,
            monto,
            metodo_pago,
            estado,
            id_asiento,
        });

        if (!reservaActualizada) {
            return res.status(404).json({ message: 'Reserva no encontrada para actualizar' });
        }

        res.status(200).json({ message: 'Reserva actualizada con éxito', reserva: reservaActualizada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la reserva' });
    }
}

// Cancelar una reserva
async function cancelar_reserva(req, res) {
    const { id_reserva } = req.params;

    try {
        const reservaCancelada = await Reserva.update(id_reserva, { estado: 'cancelado' });

        if (!reservaCancelada) {
            return res.status(404).json({ message: 'Reserva no encontrada para cancelar' });
        }

        res.status(200).json({ message: 'Reserva cancelada con éxito', reserva: reservaCancelada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al cancelar la reserva' });
    }
}

// Eliminar una reserva
async function eliminar_reserva(req, res) {
    console.log('Eliminar reserva');
    const { id_reserva } = req.params;

    try {
        const result = await Reserva.delete(id_reserva);

        if (!result) {
            return res.status(404).json({ message: 'Reserva no encontrada para eliminar' });
        }

        res.status(200).json({ message: 'Reserva eliminada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la reserva' });
    }
}

module.exports = router;
