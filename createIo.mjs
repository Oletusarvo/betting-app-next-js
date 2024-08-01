import { Server } from 'socket.io';
let io = null;
var connectedSockets = [];

export const initIo = server => {
  io = new Server(server);

  io.on('connection', socket => {
    console.log('New connection...', socket.id);
    connectedSockets.push(socket);

    socket.on('disconnect', () => {
      connectedSockets = connectedSockets.filter(s => s.id != socket.id);
      console.log(socket.id + ' disconnected.');
    });
  });

  io.on('disconnect', socket => console.log(socket.id + ' disconnected.'));
};

export const emitToAllSockets = (msg, data) => {
  connectedSockets.forEach(async socket => {
    socket.emit(msg, data);
  });
};

export const getIo = () => io;
