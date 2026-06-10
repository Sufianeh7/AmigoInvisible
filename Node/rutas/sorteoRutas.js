const express = require('express')
const router = express.Router();
const sorteoControlador = require('../controladores/sorteoControlador');

// Ruta: POST /api/sorteos
router.post('/', sorteoControlador.crearSorteo);

router.post('/:adminToken/lanzar', sorteoControlador.lanzarSorteo);

router.get('/:adminToken', sorteoControlador.obtenerSorteo);

module.exports = router;