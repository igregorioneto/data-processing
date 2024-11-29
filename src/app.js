const { initHttpServer } = require('./api/server');
const { initWebSocket } = require('./websocket/websocket');
const { initQueue } = require('./queue/queue');

const startApp = async () => {
    try {
        await initQueue();

        const httpServer = initHttpServer(3000);

        initWebSocket(httpServer);

        console.log('[App] Aplicação iniciada com sucesso.');
    } catch (error) {
        console.error('[App] Erro ao iniciar aplicação:', error);
    }
};

startApp();