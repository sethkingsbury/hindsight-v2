const PORT = 5000;

const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  socket.on('join', function (room) {
    socket.join(room);
    io.in('room1').emit('join', `${socket} has joined`);
  });
});

httpServer.listen(PORT);
