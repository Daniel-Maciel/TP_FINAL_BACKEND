const express = require('express');
const router = express.Router();
var model = require('../model/usuariomodel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Definir la ruta de inicio de sesión
router.post('/login', login);

async function login(req, res) {
    try {
        const { mail, pass } = req.body;
        const [result] = await model.findByMail(mail);

        const iguales = bcrypt.compareSync(pass, result.pass);

        if (iguales) {
            let user = {
                nombre: result.nombre,
                apellido: result.apellido,
                mail: result.mail
            }
            //firmar usuario
            jwt.sign(user, 'ultraMegaSecretPass', { expiresIn: '5m' }, (err, token) => {
                if (err) {
                    res.status(500).send({
                        message: err
                    });
                } else {
                    res.status(200).json(
                        {
                            datos: user,
                            token: token
                        }
                    );
                }
            })
        } else {
            res.status(403).send({
                message: 'Contraseña Incorrecta'
            });
        }
    } catch (error) {
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