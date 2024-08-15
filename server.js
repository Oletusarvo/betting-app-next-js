const next = require('next');
const socketServer = require('./SocketServer.js');
const { createServer } = require('node:http');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });

app.prepare().then(() => {
  const handler = app.getRequestHandler();
  const httpServer = createServer(handler);

  socketServer.config(httpServer);
  global.io = socketServer.getIo();

  httpServer
    .once('error', err => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
