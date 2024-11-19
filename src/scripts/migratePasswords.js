const bcrypt = require('bcrypt');
const db = require('../config/config_database');

async function hashearContraseñas() {
    try {
        // Paso 1: Recuperar todas las contraseñas en texto plano
        const consulta = 'SELECT id_usuario, pass FROM Usuario'; // tabla Usuario
        const [usuarios] = await db.execute(consulta);

        // Paso 2: Recorrer los usuarios y generar un hash para cada contraseña
        for (const usuario of usuarios) {
            // Hashear la contraseña con bcrypt
            const hashedPassword = bcrypt.hashSync(usuario.pass, 10); // 10 es el número de saltos 

            // Paso 3: Actualizar la base de datos con la contraseña hasheada
            const updateConsulta = 'UPDATE Usuario SET pass = ? WHERE id_usuario = ?';
            await db.execute(updateConsulta, [hashedPassword, usuario.id_usuario]);

            console.log(`Contraseña de usuario con ID ${usuario.id_usuario} actualizada.`);
        }

        console.log('Migración de contraseñas completada con éxito.');
    } catch (error) {
        console.error('Error al hashear las contraseñas:', error.message);
    }
}

// Ejecutar la función para hashear las contraseñas
hashearContraseñas();
