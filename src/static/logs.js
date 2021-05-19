document.addEventListener('DOMContentLoaded', () => {
  const ws = new WebSocket('ws://localhost:3000/logs');

  const container = document.getElementById('root');

  ws.onmessage = (event) => {
    container.innerHTML += event.data;
  };
});
