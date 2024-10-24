//avionmodel.js
const db = require('../config/config_database');

const Avion = {
    // Crear un nuevo avión
    create: async (modelo, capacidad, aerolinea) => {
        const query = 'INSERT INTO Avion (modelo, capacidad, aerolinea) VALUES (?, ?, ?)';
        try {
            const [result] = await db.execute(query, [modelo, capacidad, aerolinea]);
            return { message: 'Avión creado con éxito', detail: result };
        } catch (error) {
            throw new Error('Error al crear el avión: ' + error.message);
        }
    },

    // Obtener todos los aviones
    findAll: async () => {
        try {
            const query = 'SELECT * FROM Avion';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener los aviones: ' + error.message);
        }
    },

    // Buscar avión por ID
    findById: async (id_avion) => {
        const query = 'SELECT * FROM Avion WHERE id_avion = ?';
        try {
            const [rows] = await db.execute(query, [id_avion]);
            if (rows.length === 0) {
                throw new Error(`Avión con ID ${id_avion} no encontrado`);
            }
            return rows[0];  // Devolver solo el primer resultado
        } catch (error) {
            throw new Error('Error al buscar el avión por ID: ' + error.message);
        }
    },

    // Actualizar un avión
    update: async (id_avion, modelo, capacidad, aerolinea) => {
        const query = 'UPDATE Avion SET modelo = ?, capacidad = ?, aerolinea = ? WHERE id_avion = ?';
        try {
            const [result] = await db.execute(query, [modelo, capacidad, aerolinea, id_avion]);
            if (result.affectedRows === 0) {
                throw new Error(`No se encontró un avión con el ID: ${id_avion}`);
            }
            return { message: 'Avión actualizado con éxito', detail: result };
        } catch (error) {
            throw new Error('Error al actualizar el avión: ' + error.message);
        }
    },

    // Eliminar un avión
    delete: async (id_avion) => {
        const query = 'DELETE FROM Avion WHERE id_avion = ?';
        try {
            const [result] = await db.execute(query, [id_avion]);
            if (result.affectedRows === 0) {
                throw new Error(`No se encontró un avión con el ID: ${id_avion}`);
            }
            return { message: 'Avión eliminado con éxito', detail: result };
        } catch (error) {
            throw new Error('Error al eliminar el avión: ' + error.message);
        }
    }
};

module.exports = Avion;
