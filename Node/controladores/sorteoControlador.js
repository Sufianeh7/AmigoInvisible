const Sorteo = require('../modelos/Sorteo');
const crypto = require('crypto');
const { generarEmparejamientos } = require('../utils/algoritmoSorteo');
const { enviarCorreosSorteo } = require('../utils/mailer');

// Función para crear un nuevo sorteo
exports.crearSorteo = async (req, res) => {
    try {
        // Extraemos los datos que envía Angular en la petición
        const { nombreGrupo, presupuesto, fechaEntrega, participantes } = req.body;

        // Generamos el token único para el enlace de administración
        const adminToken = crypto.randomUUID();

        // Creamos el nuevo documento usando nuestro Modelo
        const nuevoSorteo = new Sorteo({
            nombreGrupo,
            presupuesto,
            fechaEntrega,
            adminToken,
            participantes,
        });

        // Se guarda en MongoDB
        await nuevoSorteo.save();

        // Damos respuesta a Angular y le devolvemos el token generado
        res.status(201).json({
            mensaje: '¡Grupo crado con éxito!',
            adminToken: adminToken,
            enlaceAdmin: '/admin/'+adminToken
        });

    } catch (error) {
        console.error('Error al crear el sorteo:', error);
        res.status(500).json({ error: 'Hubo un problema al crear el grupo.'});
    }
};

// Función para ejecutar el sorteo

exports.lanzarSorteo = async (req, res) => {
    try {
        const { adminToken } = req.params;

        // Buscamos el sorteo (grupo) en MongoDB
        const sorteo = await Sorteo.findOne({adminToken});

        if(!sorteo) {
            return res.status(404).json({ error: 'Sorteo no encontrado.' });
        }

        // Verificamos que haya suficientes participantes
        if (sorteo.participantes.length < 3) {
            return res.status(404).json({ error: 'Se necesitan al menos 3 participantes.'});
        }

        // Ejecutamos el algoritmo
        const parejasGeneradas = generarEmparejamientos(sorteo.participantes);

        // Guardamos los resultados en MongoDB y cambiamos el estado
        sorteo.emparejamientosActuales = parejasGeneradas;
        sorteo.estado = 'completado';

        await sorteo.save();

        // Enviamos los correos
        await enviarCorreosSorteo(parejasGeneradas, sorteo.participantes, sorteo.nombreGrupo);

        res.status(200).json({
            mensaje: '¡Sorteo realizado y correos enviados con éxito!'
        });

    } catch (error) {
        console.error('Error al lanzar el sorteo: ', error);
        res.status(400).json({error : error.message || 'Error interno en el servidor'});
    }
}

// Función para obtener datos de un grupo por el token

exports.obtenerSorteo = async (req, res) => {
    try {
        const { adminToken } = req.params;

        // Buscamos el sorteo (grupo) en MongoDB
        const sorteo = await Sorteo.findOne({ adminToken });

        if(!sorteo) {
            return res.status(404).json({ error: 'Sorteo no encontrado o el enlace es inválido.'})
        }

        // Si existe, devolvemos toda la info a Angular
        res.status(200).json(sorteo);


    } catch (error) {
        console.error('Error al obtener el sorteo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}