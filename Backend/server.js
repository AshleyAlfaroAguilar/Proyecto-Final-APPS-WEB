const express = require('express');
const cors = require('cors');
const { createServer } = require('http'); 
const dbListener = require('./dbListener');
const socketio = require('./socketio');
const MyFriend = require('./models/my_friend.model');

const app = express();

// Configuración CORS 
const corsOptions = {
  origin: "http://localhost:4200",
  methods: ["GET", "POST"],
  credentials: true
};

app.use(cors(corsOptions)); 

// Rutas API
app.get('/api/friends', async (req, res) => {
  try {
    const friends = await MyFriend.findAll();
    res.json(friends);
  } catch (error) {
    console.error('Error en /api/friends:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

const PORT = process.env.PORT || 3000;

// Crea servidor HTTP explícitamente
const httpServer = createServer(app);

// Inicializa Socket.io con el mismo servidor HTTP
const io = socketio.init(httpServer, corsOptions);

// Escucha en el puerto
httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Manejo de cierre limpio
process.on('SIGINT', () => {
  console.log('Cerrando servidor...');
  httpServer.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});