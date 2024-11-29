const amqp = require('amqplib');

let channel;

const initQueue = async () => {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    const queue = 'data_queue';
    await channel.assertQueue(queue, { durable: true });
    console.log('[Queue] Conectado ao RabbitQM e fila configurada.');
}

const sendToQueue = async (message) => {
    if (!channel) throw new Error('RabbitMQ não conectado.');
    const queue = 'data_queue';
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
    console.log(`[Queue] Messagem enviada: ${message}`);
}

module.exports = { initQueue, sendToQueue };