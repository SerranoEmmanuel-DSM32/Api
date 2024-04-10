const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Usar las rutas definidas en routes.js
app.use('/api', routes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
