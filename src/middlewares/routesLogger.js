const { Writable } = require('stream');
const morganLogger = require('morgan');

const wsClients = require('../entities/WsClients');

class EchoStream extends Writable {
  _write(chunk, enc, next) {
    wsClients.forEach((ws) => {
      if (ws.readyState === 1) {
        ws.send(String(chunk));
      }
    });

    process.stdout.write(chunk);

    next();
  }
}

const echo = new EchoStream();

morganLogger.token('request-id', (req) => req.id);

module.exports = morganLogger(
  ':date[iso] - :remote-addr - :request-id :status :method :url - :total-time',
  { stream: echo }
);
