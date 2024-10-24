//asientomodel.js
const db = require('../config/config_database');

const Asiento = {
    // Crear un nuevo asiento
    create: async (id_vuelo, numero_asiento, clase, estado = 'Disponible') => {
        const query = 'INSERT INTO Asiento (id_vuelo, numero_asiento, clase, estado) VALUES (?, ?, ?, ?)';
        try {
            const [result] = await db.execute(query, [id_vuelo, numero_asiento, clase, estado]);
            return { message: 'Asiento creado con éxito', detail: result };
        } catch (error) {
            throw new Error('Error al crear el asiento: ' + error.message);
        }
    },

    // Obtener todos los asientos
    findAll: async () => {
        try {
            const query = 'SELECT * FROM Asiento';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener los asientos: ' + error.message);
        }
    },

    // Buscar asiento por ID
    findById: async (id_asiento) => {
        const query = 'SELECT * FROM Asiento WHERE id_asiento = ?';
        try {
            const [rows] = await db.execute(query, [id_asiento]);
            if (rows.length === 0) {
                throw new Error(`Asiento con ID ${id_asiento} no encontrado`);
            }
            return rows[0];
        } catch (error) {
            throw new Error('Error al buscar el asiento por ID: ' + error.message);
        }
    },

    // Actualizar un asiento
    update: async (id_asiento, id_vuelo, numero_asiento, clase, estado) => {
        const query = 'UPDATE Asiento SET id_vuelo = ?, numero_asiento = ?, clase = ?, estado = ? WHERE id_asiento = ?';
        try {
            const [result] = await db.execute(query, [id_vuelo, numero_asiento, clase, estado, id_asiento]);
            if (result.affectedRows === 0) {
                throw new Error(`No se encontró un asiento con el ID: ${id_asiento}`);
            }
            return { message: 'Asiento actualizado con éxito', detail: result };
        } catch (error) {
            throw new Error('Error al actualizar el asiento: ' + error.message);
        }
    },

    // Eliminar un asiento
    delete: async (id_asiento) => {
        const query = 'DELETE FROM Asiento WHERE id_asiento = ?';
        try {
            const [result] = await db.execute(query, [id_asiento]);
            if (result.affectedRows === 0) {
                throw new Error(`No se encontró un asiento con el ID: ${id_asiento}`);
            }
            return { message: 'Asiento eliminado con éxito', detail: result };
        } catch (error) {
            throw new Error('Error al eliminar el asiento: ' + error.message);
        }
    }
};

module.exports = Asiento;
