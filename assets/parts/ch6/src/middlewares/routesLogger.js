const morganLogger = require('morgan');

morganLogger.token('request-id', (req) => req.id);

module.exports = morganLogger(
  ':date[iso] - :remote-addr - :request-id :status :method :url - :total-time'
);
