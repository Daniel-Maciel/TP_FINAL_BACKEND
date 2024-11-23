//vuelocontroller.js
const Vuelo = require('../model/vuelomodel');
const express = require('express');
const router = express.Router();
const { Op } = require( "sequelize")

// Rutas del controlador
router.get('/', listar_vuelo);
router.get('/:id_vuelo', buscarPorId);
router.post('/', crear_vuelo);
router.put('/:id_vuelo', actualizar_vuelo);
router.delete('/:id_vuelo', eliminar_vuelo);

// // Listar todos los vuelos
// async function listar_vuelo(req, res) {
//     console.log('listar vuelos'); 
//     try {
//         const vuelos = await Vuelo.findAll();
//         res.status(200).json(vuelos);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

async function listar_vuelo(req, res) {
    console.log('Parametros recibidos:', req.query); // Verifica los parámetros

    const { origen, destino, fechaSalida } = req.query;

    const filtros = {};

    if (origen) {
        filtros.origen = origen;
    }
    if (destino) {
        filtros.destino = destino;
    }
    if (fechaSalida) {
        filtros.fechaSalida = fechaSalida;
    }

    try {
        const vuelos = await Vuelo.findAll(filtros); // Llama a la función findAll con los filtros
        if (vuelos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron vuelos con los parámetros especificados' });
        }
        res.status(200).json(vuelos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

// Buscar vuelo por ID
async function buscarPorId(req, res) {
    console.log('Parámetro recibido en buscarPorId:', req.params);
    const { id_vuelo } = req.params;
    
    try {
        const vuelo = await Vuelo.findById(id_vuelo);
        console.log('Resultado de búsqueda:', vuelo);
        res.status(200).json(vuelo);
    } catch (error) {
        console.error('Error en buscarPorId:', error.message);
        res.status(404).json({ error: error.message });
    }
}

// Crear un nuevo vuelo
async function crear_vuelo(req, res) {
    console.log('crear vuelo nuevo'); 
    const { numero_vuelo, origen, destino, id_avion, fecha_salida, fecha_llegada } = req.body;

    // Validación básica
    if (!numero_vuelo || !origen || !destino || !id_avion || !fecha_salida || !fecha_llegada) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await Vuelo.create(numero_vuelo, origen, destino, id_avion, fecha_salida, fecha_llegada);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un vuelo
async function actualizar_vuelo(req, res) {
    console.log('actualizar vuelo'); 
    const { id_vuelo } = req.params;
    const { numero_vuelo, origen, destino, id_avion, fecha_salida, fecha_llegada } = req.body;

    // Validación básica
    if (!numero_vuelo || !origen || !destino || !id_avion || !fecha_salida || !fecha_llegada) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios para actualizar' });
    }

    try {
        const result = await Vuelo.update(id_vuelo, numero_vuelo, origen, destino, id_avion, fecha_salida, fecha_llegada);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Eliminar un vuelo
async function eliminar_vuelo(req, res) {
    console.log('eliminar vuelo'); 
    const { id_vuelo } = req.params;
    try {
        const result = await Vuelo.delete(id_vuelo);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = router;

