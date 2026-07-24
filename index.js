const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// 1. MANTENER EL HOSTING DESPIERTO (Servidor Web)
app.get('/', (req, res) => {
  res.send('El bot de Minecraft esta vivo.');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor web listo en el puerto ${PORT}`);
});

// 2. CONFIGURACIÓN DEL BOT (¡CAMBIA ESTO CON TUS DATOS!)
const botArgs = {
  host: 'survivaltranqui2026.aternos.me', // Tu IP de Aternos (sin el puerto)
  port: 30804,                         // Tu puerto de 5 dígitos (solo números)
  username: 'BotAternos247',           // El nombre que quieras para el bot
  version: 26.2                       // Auto-detectar versión
  checkTimeoutInterval: 60 * 10000 // <--- COPIA ESTA LÍNEA EXACTAMENTE IGUAL
};

let bot;

function initBot() {
  console.log('Intentando conectar al servidor...');
  bot = mineflayer.createBot(botArgs);

  bot.on('spawn', () => {
    console.log('El bot ha entrado al servidor con éxito.');

    // Rutina Anti-AFK: salta y mira a los lados cada 40 segundos
    setInterval(() => {
      if (bot && bot.entity) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);

        const yaw = Math.random() * Math.PI * 2;
        const pitch = (Math.random() - 0.5) * Math.PI / 2;
        bot.look(yaw, pitch);
      }
    }, 40000);
  });

  bot.on('end', () => {
    console.log('Conexión finalizada. Reiniciando bot en 15 segundos...');
    setTimeout(initBot, 15000);
  });

  bot.on('error', (err) => console.log('Error:', err));
}

initBot();
          
