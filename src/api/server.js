const express = require('express');
const { sendToQueue } = require('../queue/queue');
const { broadcastMessage } = require('../websocket/websocket');

const initHttpServer = (port) => {
    const app = express();

    app.use(express.json());

    app.post('/data', async (req, res) => {
        const { message } = req.body;
        if (!message) return res.status(400).send({ error: 'Message is required!' });

        await sendToQueue(message);

        broadcastMessage(message);

        return res.status(200).send({ success: true, message: 'Data processed successfully' });
    });

    const server = app.listen(port, () => {
        console.log(`[HTTP] Servidor rodando na porta ${port}`);
    });

    return server;
}

module.exports = { initHttpServer };