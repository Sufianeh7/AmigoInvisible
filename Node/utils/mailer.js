const nodemailer = require('nodemailer');

// 1. Configurar el "Transportador" con los datos de tu Gmail
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  family: 4,
  connectionTimeout: 10000,
  tls: {
    rejectUnauthorized: false
  }
});

// 2. Función para enviar los correos a todas las parejas
exports.enviarCorreosSorteo = async (parejas, participantes, nombreGrupo) => {
  try {
    // Recorremos cada pareja generada
    for (const pareja of parejas) {
      // Buscamos los nombres correspondientes a los emails para que el correo sea personalizado
      const remitente = participantes.find(p => p.email === pareja.de);
      const destinatario = participantes.find(p => p.email === pareja.para);

      const mailOptions = {
        from: `"Amigo Invisible - ${nombreGrupo}" <${process.env.EMAIL_USER}>`,
        to: remitente.email, // Se lo enviamos al que tiene que comprar el regalo
        subject: `🤫 ¡Tu Amigo Invisible de ${nombreGrupo} ha sido revelado!`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; background-color: #f9f9f9; border-radius: 10px;">
            <h2 style="color: #d9534f;">¡Hola ${remitente.nombre}! 🎄</h2>
            <p style="font-size: 16px;">El sorteo del grupo <strong>"${nombreGrupo}"</strong> se ha realizado.</p>
            <p style="font-size: 18px;">Este año te toca hacerle un regalo a:</p>
            <h1 style="color: #5cb85c; border: 2px dashed #5cb85c; display: inline-block; padding: 10px 20px; border-radius: 5px;">
              🎁 ${destinatario.nombre}
            </h1>
            <p style="font-size: 14px; margin-top: 20px; color: #777;">¡Mantén el secreto y que disfrutes buscando el regalo perfecto!</p>
          </div>
        `
      };

      // Enviamos el correo (await pausa el bucle hasta que se envíe este correo antes de pasar al siguiente)
      await transporter.sendMail(mailOptions);
    }
    
    console.log('✅ Todos los correos enviados correctamente');
  } catch (error) {
    console.error('❌ Error al enviar correos:', error);
    throw new Error('No se pudieron enviar los correos electrónicos');
  }
};