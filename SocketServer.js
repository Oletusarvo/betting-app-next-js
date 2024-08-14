const { Server } = require('socket.io');

class SocketServer {
  constructor() {
    this.connectedSockets = new Set();
    this.io = null;
  }

  config(server) {
    if (!this.io) {
      this.io = new Server(server);

      this.io.on('connection', socket => {
        console.log('New connection...', socket.id);
        this.connectedSockets.add(socket);

        socket.on('disconnect', () => {
          this.connectedSockets.delete(socket);
          console.log(socket.id + ' disconnected.');
        });
      });

      this.io.on('disconnect', socket => console.log(socket.id + ' disconnected.'));
      console.log('SocketServer configured!');
    } else {
      console.log('SocketServer already configured.');
    }
  }

  getIo() {
    if (!this.io) throw new Error('The Socket instance is not initialized! Did you call config?');
    return this.io;
  }
}

module.exports = new SocketServer();
