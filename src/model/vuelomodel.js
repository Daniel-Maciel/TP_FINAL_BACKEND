//vuelomodel.js
const db = require('../config/config_database');

const Vuelo = {
    // Crear un nuevo vuelo
    create: async (numero_vuelo, origen, destino, id_avion, fecha_salida, fecha_llegada) => {
        const query = 'INSERT INTO Vuelo (numero_vuelo, origen, destino, id_avion, fecha_salida, fecha_llegada) VALUES (?, ?, ?, ?, ?, ?)';
        try {
            const [result] = await db.execute(query, [numero_vuelo, origen, destino, id_avion, fecha_salida, fecha_llegada]);
            return { message: 'Vuelo creado con éxito', detail: result };
        } catch (error) {
            throw new Error('Error al crear el vuelo: ' + error.message);
        }
    },

    // Obtener todos los vuelos
    findAll: async () => {
        try {
            const query = 'SELECT * FROM Vuelo';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener los vuelos: ' + error.message);
        }
    },

    // Buscar vuelo por ID
    findById: async (id_vuelo) => {
        const query = 'SELECT * FROM Vuelo WHERE id_vuelo = ?';
        try {
            const [rows] = await db.execute(query, [id_vuelo]);
            if (rows.length === 0) {
                throw new Error(`Vuelo con id ${id_vuelo} no encontrado`);
            }
            return rows[0];  // Devolver solo el primer resultado
        } catch (error) {
            throw new Error('Error al buscar el vuelo por ID: ' + error.message);
        }
    },

    // Actualizar un vuelo
    update: async (id_vuelo, numero_vuelo, origen, destino, id_avion, fecha_salida, fecha_llegada) => {
        const query = 'UPDATE Vuelo SET numero_vuelo = ?, origen = ?, destino = ?, id_avion = ?, fecha_salida = ?, fecha_llegada = ? WHERE id_vuelo = ?';
        try {
            const [result] = await db.execute(query, [numero_vuelo, origen, destino, id_avion, fecha_salida, fecha_llegada, id_vuelo]);
            if (result.affectedRows === 0) {
                throw new Error(`No se encontró un vuelo con el ID: ${id_vuelo}`);
            }
            return { message: 'Vuelo actualizado con éxito', detail: result };
        } catch (error) {
            throw new Error('Error al actualizar el vuelo: ' + error.message);
        }
    },

    // Eliminar un vuelo
    delete: async (id_vuelo) => {
        const query = 'DELETE FROM Vuelo WHERE id_vuelo = ?';
        try {
            const [result] = await db.execute(query, [id_vuelo]);
            if (result.affectedRows === 0) {
                throw new Error(`No se encontró un vuelo con el ID: ${id_vuelo}`);
            }
            return { message: 'Vuelo eliminado con éxito', detail: result };
        } catch (error) {
            throw new Error('Error al eliminar el vuelo: ' + error.message);
        }
    }
};

module.exports = Vuelo;
