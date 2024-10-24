//reservamodel.js
const db = require('../config/config_database');

const Reserva = {
    // Crear una nueva reserva
    create: async (id_usuario, id_vuelo, monto, metodo_pago, estado = 'Pendiente', id_asiento) => {
        const query = 'INSERT INTO Reserva (id_usuario, id_vuelo, monto, metodo_pago, estado, id_asiento) VALUES (?, ?, ?, ?, ?, ?)';
        try {
            const [result] = await db.execute(query, [id_usuario, id_vuelo, monto, metodo_pago, estado, id_asiento]);
            return { message: 'Reserva creada con éxito', detail: result };
        } catch (error) {
            throw new Error('Error al crear la reserva: ' + error.message);
        }
    },

    // Obtener todas las reservas
    findAll: async () => {
        try {
            const query = 'SELECT * FROM Reserva';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener las reservas: ' + error.message);
        }
    },

    // Buscar reserva por ID
    findById: async (id_reserva) => {
        const query = 'SELECT * FROM Reserva WHERE id_reserva = ?';
        try {
            const [rows] = await db.execute(query, [id_reserva]);
            if (rows.length === 0) {
                throw new Error(`Reserva con ID ${id_reserva} no encontrada`);
            }
            return rows[0]; // Devolver solo el primer resultado
        } catch (error) {
            throw new Error('Error al buscar la reserva por ID: ' + error.message);
        }
    },

    // Actualizar una reserva
    update: async (id_reserva, id_usuario, id_vuelo, monto, metodo_pago, estado, id_asiento) => {
        const query = 'UPDATE Reserva SET id_usuario = ?, id_vuelo = ?, monto = ?, metodo_pago = ?, estado = ?, id_asiento = ? WHERE id_reserva = ?';
        try {
            const [result] = await db.execute(query, [id_usuario, id_vuelo, monto, metodo_pago, estado, id_asiento, id_reserva]);
            if (result.affectedRows === 0) {
                throw new Error(`No se encontró una reserva con el ID: ${id_reserva}`);
            }
            return { message: 'Reserva actualizada con éxito', detail: result };
        } catch (error) {
            throw new Error('Error al actualizar la reserva: ' + error.message);
        }
    },

    // Método para cancelar una reserva
    cancelarReserva: async (id_reserva) => {
        const query = 'UPDATE Reserva SET estado = "Cancelada" WHERE id_reserva = ?';
        try {
            const [result] = await db.execute(query, [id_reserva]);
            if (result.affectedRows === 0) {
                throw new Error(`No se encontró una reserva con el ID: ${id_reserva}`);
            }
            return { message: 'Reserva cancelada con éxito', detail: result };
        } catch (error) {
            throw new Error('Error al cancelar la reserva: ' + error.message);
        }
    },

    // Eliminar una reserva
    delete: async (id_reserva) => {
        const query = 'DELETE FROM Reserva WHERE id_reserva = ?';
        try {
            const [result] = await db.execute(query, [id_reserva]);
            if (result.affectedRows === 0) {
                throw new Error(`No se encontró una reserva con el ID: ${id_reserva}`);
            }
            return { message: 'Reserva eliminada con éxito', detail: result };
        } catch (error) {
            throw new Error('Error al eliminar la reserva: ' + error.message);
        }
    }
};

module.exports = Reserva;
