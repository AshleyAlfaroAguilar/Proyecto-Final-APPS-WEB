const socketio = require('socket.io');

let io;

exports.init = (httpServer, corsOptions) => {
  io = socketio(httpServer, {
    cors: corsOptions,
    transports: ['websocket'], 
    allowEIO3: true 
  });

  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);
    
    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });

  return io;
};

exports.emitChange = (data) => {
  if (!io) {
    console.error('Socket.io no está inicializado');
    return;
  }
  
  try {
    io.emit('table_change', data);
  } catch (error) {
    console.error('Error al emitir cambio:', error);
  }
};