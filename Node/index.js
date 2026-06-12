// Carga las variables de entorno
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000

// ---- MIDDLEWARES ----
app.use(cors()); // Permite peticiones desde Angular
app.use(express.json()); // Permite que el servidor entienda JSON

// ---- CONEXIÓN A MONGO ----
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch((error) => console.error('❌ Error al conectar a MongoDB:', error)
    )

// ---- IMPORTAR RUTAS ----
const sorteoRutas = require('./rutas/sorteoRutas');

// ---- USAR RUTAS ----
app.use('/api/sorteos', sorteoRutas);



// ---- ARRANCAR EL SERVIDOR ----
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}

module.exports = app;