const express = require('express');
const db = require('./db');

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM tb_usuarios', (err, rows) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json(rows);
  });
});

// Ruta para obtener un usuario por su ID
router.get('/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM tb_usuarios WHERE id = ?', [userId], (err, rows) => {
    if (err) {
      console.error('Error al obtener usuario:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    if (rows.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }
    res.json(rows[0]);
  });
});

// Ruta para agregar un nuevo usuario
router.post('/usuarios', (req, res) => {
  const { nombre, ap_pat, ap_mat, edad, genero, email, password } = req.body;
  db.query('INSERT INTO tb_usuarios (nombre, ap_pat, ap_mat, edad, genero, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [nombre, ap_pat, ap_mat, edad, genero, email, password], 
    (err, result) => {
      if (err) {
        console.error('Error al agregar usuario:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
      res.json({ message: 'Usuario agregado correctamente', id: result.insertId });
    }
  );
});

// Ruta para eliminar un usuario por su ID
router.delete('/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM tb_usuarios WHERE id = ?', [userId], (err, result) => {
    if (err) {
      console.error('Error al eliminar usuario:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

module.exports = router;
