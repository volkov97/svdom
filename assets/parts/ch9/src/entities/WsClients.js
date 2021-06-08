class WsClients {
  constructor() {
    this.clients = [];
  }

  add(ws) {
    this.clients.push(ws);
  }

  remove(ws) {
    this.clients = this.clients.filter((client) => client !== ws);
  }

  forEach(callback) {
    this.clients.forEach((client) => callback(client));
  }
}

module.exports = new WsClients();
