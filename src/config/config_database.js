const mysql = require('mysql2/promise');
const config = require('./config.json');

const db = mysql.createPool(config.database);

async function testConnection() {
  try {
    const [rows, fields] = await db.query('SELECT 1'); // Consulta de prueba.
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

testConnection();

module.exports = db;

