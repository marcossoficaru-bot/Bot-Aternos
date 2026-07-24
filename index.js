const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// 1. SERVIDOR WEB PARA UP_TIME_ROBOT
app.get('/', (req, res) => {
  res.send('El bot de Minecraft esta vivo.');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor web listo en el puerto ${PORT}`);
});

// 2. CONFIGURACIÓN DEL BOT (Pon tus datos exactos aquí)
const botArgs = {
  host: 'survivaltranqui2026.aternos.me', // <--- Pon tu IP aquí entre comillas simples
  port: 30804,                         // <--- Pon tu puerto numérico actual aquí (sin comillas)
  username: 'Mr_Prendedor247',           
  version: "26.2",                   // <--- Pon tu versión exacta aquí entre comillas
  checkTimeoutInterval: 60000          // Evita desconexiones por lag
};

let bot;

function initBot() {
  console.log('Intentando conectar al servidor...');
  bot = mineflayer.createBot(botArgs);

  bot.on('spawn', () => {
    console.log('El bot ha entrado al servidor con éxito.');
    
    // Rutina Anti-AFK mejorada a 90 segundos para evitar saturación
    setInterval(() => {
      if (bot && bot.entity) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
        
        const yaw = Math.random() * Math.PI * 2;
        const pitch = (Math.random() - 0.5) * Math.PI / 2;
        bot.look(yaw, pitch);
      }
    }, 90000);
  });

  bot.on('end', () => {
    console.log('Conexión finalizada. Reiniciando bot en 15 segundos...');
    setTimeout(initBot, 15000);
  });

  bot.on('error', (err) => {
    console.log('Error detectado en el bot:', err.message);
  });
}

initBot();
