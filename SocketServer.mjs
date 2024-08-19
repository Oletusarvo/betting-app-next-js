import { Server } from 'socket.io';

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

        socket.on('join_game', gameId => {
          socket.join(`gameroom-${gameId}`);
        });

        socket.on('join_wallet', walletId => {
          socket.join(`wallet-${walletId}`);
        });

        socket.on('leave_wallet', walletId => {
          socket.leave(`wallet-${walletId}`);
        });

        socket.on('leave_game', gameId => {
          socket.leave(`gameroom-${gameId}`);
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

export const socketServer = new SocketServer();
