// Función para barajar un array
const mezclarArray = (array) => {
    const mezclado = [...array];
    for(let i = mezclado.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mezclado[i], mezclado[j]] = [mezclado[j], mezclado[i]];
    }

    return mezclado;
}

exports.generarEmparejamientos = (participantes) => {
    const MAX_INTENTOS = 1000;

    for (let intento = 0; intento < MAX_INTENTOS; intento++){
        // Cramos una lista de receptores barajada
        const receptores = mezclarArray(participantes);
        let esValido = true;
        const parejas = [];

        // Comprobamos la lista generada
        for (let i = 0; i < participantes.length; i++) {
            const de = participantes[i];
            const para = receptores[i];

            // Regla 1 : No me puedo regalar a mi mismo
            const esMismoUsuario = de.email === para.email;

            // Regla 2 : El receptor no puede estar en mis excluidos
            const estaExcluido = de.exclusiones.includes(para.nombre);

            if( esMismoUsuario || estaExcluido ){
                esValido = false;
                break; // La combinación no vale, se rompe el bucle de comrobación
            }

            // Si pasa los filtros, añadimos la pareja
            parejas.push({ de: de.email, para: para.email });
        }

        // Si todo el array es valido, se devuelve el resultado
        if (esValido){
            return parejas;
        }
    }

    // Si después de 1000 intentos no encuentra combinación es practicamente imposible. Se lanza un error
    throw new Error('No se pudo encontrar una combinación válida. Revisa las exclusiones.');
};