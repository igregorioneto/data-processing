const WebSocket = require('ws');

let clients = [];

const initWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });
    console.log('[WebSocket] Servidor WebSocket iniciado.');

    wss.on('connection', (ws) => {
        clients.push(ws);
        console.log('[WebSocket] Cliente conectado.');

        ws.on('close', () => {
            clients = clients.filter(client => client !== ws);
            console.log('[WebSocket] Cliente desconectado.');
        });
    });
}

const broadcastMessage = (message) => {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
    console.log(`[WebSocket] Mensagem enviada para todos os clientes: ${message}`);
}

module.exports = { initWebSocket, broadcastMessage };