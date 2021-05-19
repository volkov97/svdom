const WebSocket = require('ws');
const wsClients = require('./entities/WsClients');

module.exports = (server) => {
  const wsServer = new WebSocket.Server({ server });

  wsServer.on('connection', async (ws, req) => {
    if (req.url === '/logs') {
      wsClients.add(ws);

      ws.on('error', () => {
        ws.close();
      });

      ws.on('close', () => {
        wsClients.remove(ws);
      });
    }
  });
};
