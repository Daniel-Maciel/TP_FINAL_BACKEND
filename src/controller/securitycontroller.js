//securitycontroller.js
const express = require('express');
const router = express.Router();
var model = require('../model/usuariomodel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Definir la ruta de inicio de sesión
router.post('/login', login);

async function login(req, res) {
    try {
        console.log('Petición de login recibida:', req.body);

        const { mail, pass } = req.body;
        const user = await model.findByMail(mail);
        console.log('Resultado del modelo:', user);

        const iguales = bcrypt.compareSync(pass, user.pass);

        if (iguales) {
            console.log('Contraseña válida, generando token...');
            const payload = {
                nombre:user.nombre,
                apellido: user.apellido,
                mail: user.email,
                id_rol: user.id_rol, // Asegúrate de agregar id_rol aquí
            }
            //firmar usuario
            jwt.sign(payload, 'ultraMegaSecretPass', { expiresIn: '5m' }, (err, token) => {
                if (err) {
                    res.status(500).send({
                        message: err
                    });
                } else {
                    res.status(200).json(
                        {
                            datos: payload,
                            token: token
                        }
                    );
                }
            })
        } else {
            console.log('Contraseña incorrecta');
            res.status(403).send({
                message: 'Contraseña Incorrecta'
            });
        }
    } catch (error) {
        console.error('Error en login:', error.message);
        res.status(500).send({ message: error.message });
    }
}


function verificarToken(req, res, next) {
    if (req.headers["authorization"]) {
        try {

            const token = req.headers["authorization"]
            const verified = jwt.verify(token, "ultraMegaSecretPass");
            if (verified) {
                next();
            } else {
                res.status(403).send({
                    message: "Token invalido, permiso denegado"
                });
            }

        } catch (error) {
            res.status(403).send({
                message: "Acceso Denegado"
            });
        }

    } else {
        res.status(403).send({
            message: "No posee token de autorizacion"
        });
    }
}

module.exports = { router, verificarToken };