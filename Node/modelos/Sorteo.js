const mongoose = require('mongoose');

const SorteoSchema = new mongoose.Schema({
    nombreGrupo: { type: String, required: true, trim: true},
    presupuesto: { type: String, trim: true },
    fechaEntrega: { type: Date},

    // Token para la URL de administración
    adminToken: { type: String, required: true, unique: true},
    estado: { type: String, enum: ['borrador', 'completado'], default: 'borrador'},

    // Lista de amigos
    participantes: [{
        nombre: { type: String, required: true },
        email: { type: String, required: true },
        exclusiones: [{ type: String}]
    }],

    // Historial para reutilizar
    emparejamientosPasados: [{
        fechaSorteo: { type: Date, default: Date.now},
        parejas: [{
            de: { type: String },
            para: { type: String }
        }]
    }]
}, { timestamps: true});

module.exports = mongoose.model('Sorteo', SorteoSchema);