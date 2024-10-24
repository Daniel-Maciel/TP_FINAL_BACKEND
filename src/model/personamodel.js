//personamodel.js
const db = require('../config/config_database');

const Persona = {

    create: async (dni, nombre, apellido, direccion, telefono) => {
        const query = 'INSERT INTO PERSONA (dni, nombre, apellido, direccion, telefono) VALUES (?, ?, ?, ?, ?)';
        try {
            const [result] = await db.execute(query, [dni, nombre, apellido, direccion, telefono]);
            return { message: "Persona creada con éxito", detail: result };
        } catch (error) {
            throw new Error('Error al crear la persona: ' + error.message);
        }
    },

    findAll: async () => {
        try {
            const query = 'SELECT * FROM PERSONA';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener las personas: ' + error.message);
        }
    },

    findByDni: async (dni) => {
        const query = 'SELECT * FROM PERSONA WHERE dni = ?';
        try {
            const [rows] = await db.execute(query, [dni]);
            if (rows.length === 0) {
                const error = new Error(`No se encontró una persona con el DNI: ${dni}`);
                error.statusCode = 404;
                throw error;
            }
            return rows[0]; 
        } catch (error) {
            throw new Error('Error al buscar la persona por DNI: ' + error.message);
        }
    },

    update: async (dni, nombre, apellido, direccion, telefono) => {
        const query = 'UPDATE PERSONA SET nombre = ?, apellido = ?, direccion = ?, telefono = ? WHERE dni = ?';
        try {
            const [result] = await db.execute(query, [nombre, apellido, direccion, telefono, dni]);
            if (result.affectedRows === 0) {
                const error = new Error(`No se encontró una persona con el DNI: ${dni}`);
                error.statusCode = 404;
                throw error;
            }
            return { message: "Persona actualizada con éxito", detail: result };
        } catch (error) {
            throw new Error('Error al actualizar la persona: ' + error.message);
        }
    },

    delete: async (dni) => {
        try {
            const query = 'DELETE FROM PERSONA WHERE dni = ?';
            const [result] = await db.execute(query, [dni]);

            if (result.affectedRows === 0) {
                const error = new Error(`No se encontró una persona con el DNI: ${dni}`);
                error.statusCode = 404;
                throw error;
            }

            return { message: "Persona eliminada con éxito", detail: result };

        } catch (error) {
            throw new Error('Error al eliminar la persona: ' + error.message);
        }
    }
};

module.exports = Persona;