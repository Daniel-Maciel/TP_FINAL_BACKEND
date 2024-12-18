//usuariocontroller.js
// const model = require ('../model/usuariomodel');
// const model = require ('../model/personamodel');
const personamodel = require('../model/personamodel'); // Cambia a un nombre específico
const usuariomodel = require('../model/usuariomodel'); 
const { validacionusuario, validarusuario } = require('../middleware/validarusuario');
const { actualizarusuariovalidado, validarusuarioactualizado } = require('../middleware/validarusuarioactualizado');

const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;  // Define el número de rondas para bcrypt

// Rutas del controlador
router.get('/', listar_usuario);
router.get('/:id_usuario', buscarPorId);
router.post('/', validacionusuario(), validarusuario, crear_usuario);
router.put('/:id_usuario', actualizarusuariovalidado(), validarusuarioactualizado, actualizar_usuario);
router.delete('/:id_usuario', eliminar_usuario);
router.post('/login', login);
router.post('/register', registrar_usuario);

// Listar todos los usuarios
async function listar_usuario(req, res) {
    console.log('Listar usuarios'); 
    try {
        const usuarios = await usuariomodel.findAll();  
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Buscar usuario por ID
async function buscarPorId(req, res) {
    console.log('buscar usuario por id'); 
    const { id_usuario } = req.params;
    try {
        const usuario = await usuariomodel.findById(id_usuario);  
        res.status(200).json(usuario);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Crear un nuevo usuario
async function crear_usuario(req, res) {
    console.log('crear usuario nuevo'); 
    const { id_rol, dni, email, pass } = req.body;

    // Validación básica
    if (!dni || !email || !pass) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Hashear la contraseña
        const hashedPass = await bcrypt.hash(pass, saltRounds);

        // Crear el usuario con la contraseña hasheada
        const result = await usuariomodel.create(id_rol || 1, dni, email, hashedPass);  
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un usuario
async function actualizar_usuario(req, res) {
    console.log('actualizar usuario'); 
    const { id_usuario } = req.params;
    const { id_rol, dni, email, pass } = req.body;

    // Validación básica
    if (!dni || !email || !pass) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios para actualizar' });
    }

    try {
        // Hashear la nueva contraseña
        const hashedPass = await bcrypt.hash(pass, saltRounds);

        // Actualizar el usuario con la nueva contraseña hasheada
        const result = await usuariomodel.update(id_usuario, id_rol || 1, dni, email, hashedPass);  
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Eliminar un usuario
async function eliminar_usuario(req, res) {
    console.log('eliminar usuario'); 
    const { id_usuario } = req.params;
    try {
        const result = await usuariomodel.delete(id_usuario);  
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Login de un usuario controller
async function login(req, res) {
    console.log('Ingreso con login');
    try {
        const { mail, pass } = req.body;

        // Buscar usuario por correo
        const result = await usuariomodel.findByMail(mail);

        // Verificar contraseña
        const iguales = bcrypt.compareSync(pass, result.pass);
        if (!iguales) {
            return res.status(403).send({ message: 'Contraseña incorrecta' });
        }

        // Datos del usuario
        const user = {
            nombre: result.nombre,
            apellido: result.apellido,
            mail: result.email,
            //id_rol: result.id_rol, // Asegúrate de agregar id_rol aquí
        };

        // Clave secreta para JWT
        const secretKey = process.env.JWT_SECRET || 'ultraMegaSecretPass';
        console.log('Clave secreta JWT:', process.env.JWT_SECRET);


        // Generar token
        jwt.sign(user, secretKey, { expiresIn: '10000s' }, (err, token) => {
            if (err) {
                console.error('Error generando el token:', err);
                return res.status(500).send({ message: 'Error generando el token de autenticación' });
            }
            console.log('Token generado:', token);

            // Enviar respuesta con datos del usuario y token
            res.status(200).json({ datos: user,  token: token });
        });
    } catch (error) {
        console.error('Error en login:', error.message);
        res.status(500).send({ message: error.message });
    }
}


async function registrar_usuario(req, res) {
    console.log('Registrar usuario');
    const { dni, nombre, apellido, direccion, telefono, email, pass, id_rol } = req.body;

    if (!dni || !nombre || !apellido || !direccion || !telefono || !email || !pass || !id_rol) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const hashedPass = await bcrypt.hash(pass, 10);

        console.log('Creando persona...');
        await personamodel.create(dni, nombre, apellido, direccion, telefono);

        console.log('Creando usuario...');
        await usuariomodel.create(id_rol, dni, email, hashedPass);

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ error: error.message });
    }
}


module.exports = router;