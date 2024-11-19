const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send({ message: 'Token no proporcionado' });
    }

    const secretKey = process.env.JWT_SECRET || 'ultraMegaSecretPass';

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).send({ message: 'Token inválido o expirado' });
        }

        req.user = user; // Adjuntar información del usuario al request
        next();
    });
}

module.exports = authenticateToken;
