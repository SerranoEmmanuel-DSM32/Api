const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'srv1352.hstgr.io',
  user: 'u691475477_agra',
  password: 'LEG7101qw%',
  database: 'u691475477_techsystem'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

module.exports = connection;
