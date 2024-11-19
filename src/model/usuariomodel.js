//usuariomodel.js
const db = require('../config/config_database');

const Usuario = {
    // Crear un nuevo usuario con la contraseña hasheada
    create: async (id_rol, dni, email, hashedPass) => {
        const query = 'INSERT INTO USUARIO (id_rol, dni, email, pass) VALUES (?, ?, ?, ?)';
        try {
            const [result] = await db.execute(query, [id_rol, dni, email, hashedPass]);
            return { message: 'Usuario creado con éxito', detail: result };
        } catch (error) {
            throw new Error('Error al crear el usuario: ' + error.message);
        }
    },

    // Obtener todos los usuarios
    findAll: async () => {
        try {
            const query = 'SELECT * FROM USUARIO';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener los usuarios: ' + error.message);
        }
    },

    //busqueda por mail 
    findByMail: async (email) => {

        try {
            // Consulta corregida para hacer el JOIN correctamente
            const consulta = `
                SELECT u.email, u.pass, p.nombre, p.apellido
                FROM Usuario u
                JOIN Persona p ON u.dni = p.dni
                WHERE u.email = ?`;
    
            // Ejecutar la consulta
            const [result] = await db.execute(consulta, [email]);
    
            if (result.length == 0) {
                throw new Error(`Usuario no encontrado con el mail: ${email}`);
            }
    
            // Si la consulta es exitosa, se devuelve el resultado
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Buscar usuario por ID
    findById: async (id_usuario) => {
        const query = 'SELECT * FROM USUARIO WHERE id_usuario = ?';
        try {
            const [rows] = await db.execute(query, [id_usuario]);
            if (rows.length === 0) {
                throw new Error(`Usuario con id ${id_usuario} no encontrado`);
            }
            return rows[0];  // Devolver solo el primer resultado
        } catch (error) {
            throw new Error('Error al buscar el usuario por ID: ' + error.message);
        }
    },

    // Actualizar un usuario con una nueva contraseña hasheada
    update: async (id_usuario, id_rol, dni, email, hashedPass) => {
        const query = 'UPDATE USUARIO SET id_rol = ?, dni = ?, email = ?, pass = ? WHERE id_usuario = ?';
        try {
            const [result] = await db.execute(query, [id_rol, dni, email, hashedPass, id_usuario]);
            if (result.affectedRows === 0) {
                throw new Error(`No se encontró un usuario con el ID: ${id_usuario}`);
            }
            return { message: 'Usuario actualizado con éxito', detail: result };
        } catch (error) {
            throw new Error('Error al actualizar el usuario: ' + error.message);
        }
    },

    // Eliminar un usuario
    delete: async (id_usuario) => {
        const query = 'DELETE FROM USUARIO WHERE id_usuario = ?';
        try {
            const [result] = await db.execute(query, [id_usuario]);
            if (result.affectedRows === 0) {
                throw new Error(`No se encontró un usuario con el ID: ${id_usuario}`);
            }
            return { message: 'Usuario eliminado con éxito', detail: result };
        } catch (error) {
            throw new Error('Error al eliminar el usuario: ' + error.message);
        }
    }
};

module.exports = Usuario;
