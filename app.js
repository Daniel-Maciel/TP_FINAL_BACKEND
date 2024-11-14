//app.js
const express = require('express');
const config = require('./src/config/config.json');
const app = express();
const cors = require('cors');
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const asientocontroller = require('./src/controller/asientocontroller');      // Importar el controlador de asiento
const avioncontroller = require('./src/controller/avioncontroller');         // Importar el controlador de aviones
const personacontroller = require('./src/controller/personacontroller');    // Importar el controlador de personas
const reservacontroller = require('./src/controller/reservacontroller');   // Importar el controlador de resereva
const securitycontroller = require('./src/controller/securitycontroller'); 
const usuariocontroller = require('./src/controller/usuariocontroller');  // Importar el controlador de usuario
const vuelocontroller = require('./src/controller/vuelocontroller');     // Importar el controlador de vuelo



app.use('/asiento', asientocontroller);      // ruta de asiento
app.use('/avion', avioncontroller);         // ruta de avion
app.use('/persona', personacontroller);    // ruta de persona
app.use('/reserva', reservacontroller);   // ruta de reserva
app.use('/security', securitycontroller.router);
app.use('/usuario', usuariocontroller);  // ruta de usuario
app.use('/vuelo', vuelocontroller);     // ruta de vuelo



// funcion que intenta iniciar el servidor en el puerto especificado o en el siguiente disponible
function startServer(puerto) {
    const server = app.listen(puerto, () => {
        console.log(`Servidor escuchando en: http://localhost:${puerto}`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Puerto ${puerto} en uso, intentando con el puerto ${puerto + 1}...`);
            puerto++;
            startServer(puerto); // Intenta con el siguiente puerto
        } else {
            console.error('Error al iniciar el servidor:', err);
        }
    });
}

// invocamos la funcion que intenta iniciar el servidor en el puerto que le pasemos
startServer(config.server.port);

//module.exports = app;
module.exports = app;

